require("dotenv").config();
const { ApolloServer, gql, UserInputError, AuthenticationError } = require("apollo-server");
const mongoose = require("mongoose");
const Book = require("./models/Book");
const Author = require("./models/Author");
const User = require("./models/User");
const jwt = require("jsonwebtoken");

const MONGODB_URI = `mongodb+srv://FSD:${process.env.CLUSTER_PASSWORD}@fsoc.bwmi0wb.mongodb.net/libraryApp?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI)
        .then(() => console.log("Connected to MongoDB"))
        .catch(err => console.log("error connection to MongoDB:", err.message));
/*
let authors = [
  {
    name: "Robert Martin",
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: "Martin Fowler",
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: "Fyodor Dostoevsky",
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: "Joshua Kerievsky", // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: "Sandi Metz", // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];
*/

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author"s id in the context of the book instead of the author"s name
 * However, for simplicity, we will store the author"s name in connection with the book
*/

/*
let books = [
  {
    title: "Clean Code",
    published: 2008,
    author: "Robert Martin",
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Agile software development",
    published: 2002,
    author: "Robert Martin",
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ["agile", "patterns", "design"]
  },
  {
    title: "Refactoring, edition 2",
    published: 2018,
    author: "Martin Fowler",
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring"]
  },
  {
    title: "Refactoring to patterns",
    published: 2008,
    author: "Joshua Kerievsky",
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "patterns"]
  },  
  {
    title: "Practical Object-Oriented Design, An Agile Primer Using Ruby",
    published: 2012,
    author: "Sandi Metz",
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ["refactoring", "design"]
  },
  {
    title: "Crime and punishment",
    published: 1866,
    author: "Fyodor Dostoevsky",
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "crime"]
  },
  {
    title: "The Demon",
    published: 1872,
    author: "Fyodor Dostoevsky",
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ["classic", "revolution"]
  },
];
*/

const typeDefs = gql`
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!
  }

  type Author {
    name: String!,
    id: ID!,
    born: Int,
    bookCount: Int!
  }

  type User {
    username: String!,
    favouriteGenre: String!,
    id: ID!
  }

  type Token {
    value: String!  
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!,
    allAuthors: [Author!]!,
    me: User
  }

  type Mutation {
    addBook(title: String!,
            author: String!,
            published: Int!,
            genres: [String!]!): Book!,
    editAuthor(name: String!,
               setBornTo: Int!): Author,
    createUser(username: String!, favouriteGenre: String!): User,
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const books = await Book.find();
      return books.length;
    },
    authorCount: async () => {
      const authors = await Author.find();
      return authors.length;
    },
    allBooks: async (root, args) => {
      let books = await Book.find().populate("author");
      
      if (args.author)
        books = books.filter(book => book.author.name === args.author);

      if (args.genre)
        books = books.filter(book => book.genres.includes(args.genre));

      return books;
    },
    allAuthors: async () => {
      return Author.find();
    },
    me: (root, args, { currentUser }) => currentUser ? currentUser : null
  },
  Author: {
    bookCount: async (root) => {
      const books = await Book.find().populate("author");
  
      let count = 0;

      for (let i = 0; i < books.length; i++)
        if (books[i].author.name === root.name)
          count++;

      return count;
    }
  },
  Token: {
    value: (root) => root
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError("not authenticated");

      let author = await Author.findOne({name: args.author});

      if (!author)
      {
        const newAuthor = new Author({name: args.author});

        try 
        {
          author = await newAuthor.save();
        }
        catch (err)
        {
          throw new UserInputError(err.message, {invalidArgs: args});
        }
      }

      const { title, published, genres } = args;

      const newBook = new Book({author: author.id, title, published, genres});

      let addedBook;

      try 
      {
        addedBook = await newBook.save();
      }
      catch (err)
      {
        throw new UserInputError(err.message, {invalidArgs: args});
      }

      return Book.findOne({_id: addedBook.id}).populate("author");
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser)
        throw new AuthenticationError("not authenticated");

      const authorToEdit = await Author.findOne({name: args.name}); 

      if (!authorToEdit)
        return null;

      authorToEdit.born = args.setBornTo;

      const editedAuthor = await authorToEdit.save();

      return editedAuthor;
    },
    createUser: async (root, args) => {
      const { username, favouriteGenre } = args;

      const user = new User({username, favouriteGenre});

      let addedUser;

      try 
      {
        addedUser = await user.save();
      }
      catch(err)
      {
        throw new UserInputError(err.message, {invalidArgs: args});
      }

      return addedUser;
    },
    login: async (root, args) => {
      const { username, password } = args;

      const user = await User.findOne({username});

      if (!user || password !== "SOME_PASSWORD")
        throw new UserInputError("wrong credentials");

      const token = jwt.sign({id: user._id, username: user.username}, process.env.SECRET_KEY);
      return token;
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authorization = req.headers.authorization;

    if (authorization && authorization.toLowerCase().startsWith("bearer "))
    {
      const decodedToken = jwt.verify(authorization.substr(7), process.env.SECRET_KEY);

      const currentUser = await User.findOne({_id: decodedToken.id});

      return {currentUser};
    }

    return {};
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
});