const dummy = blogs => 1;

const totalLikes = blogs => {
	let result = 0;

	for (const blog of blogs)
		result += blog.likes;

	return result;
};

const favoriteBlog = blogs => {
	let result = null, maxLikes = -1;

	for (const blog of blogs)
		if (blog.likes > maxLikes)
			{
				result = {title: blog.title, author: blog.author, likes: blog.likes};
				//result = blog;
				maxLikes = blog.likes;
			};

	return result;
};

const mostBlogs = blogs => {
	const mp = new Map();

	for (const blog of blogs)
	{
		const authorName = blog.author;

		if (mp.has(authorName))
			mp.set(authorName, mp.get(authorName) + 1);
		else
			mp.set(authorName, 1);
	}

	let maxBlogs = 0, result = null;
	for (const [k, v] of mp)
	{
		if (v > maxBlogs)
		{
			result = {author: k, blogs: v};
			maxBlogs = v;
		}
	}

	return result;
};

const mostLikes = blogs => {
	const mp = new Map();

	for (const blog of blogs)
	{
		const authorName = blog.author;

		if (mp.has(authorName))
			mp.set(authorName, mp.get(authorName) + blog.likes);
		else
			mp.set(authorName, blog.likes);
	}

	let maxLikes = 0, result = null;
	for (const [k, v] of mp)
	{
		if (v > maxLikes)
		{
			result = {author: k, likes: v};
			maxLikes = v;
		}
	}

	return result;
};

module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes};