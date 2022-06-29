import Blog from "./Blog";
import PropTypes from "prop-types";

const Blogs = ({ blogs, updateBlog, currentUsername, handleBlogRemoval }) => {
	return (
		<>
			<h2>blogs</h2>

			{blogs.map(blog => <Blog key={blog.id} blog={blog} updateBlog = {updateBlog} currentUsername = {currentUsername} handleBlogRemoval = {handleBlogRemoval} />)}
		</>
	);
};

Blogs.propTypes = {
	blogs : PropTypes.array.isRequired,
	updateBlog : PropTypes.func.isRequired,
	currentUsername : PropTypes.string.isRequired,
	handleBlogRemoval : PropTypes.func.isRequired
};

export default Blogs;