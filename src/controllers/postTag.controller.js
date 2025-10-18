const { PostTag, Tag, Post } = require("../../db/models");

// AÑADE UNA TAG A UN POST
const addTagToPost = async (req, res) => {
  const { tagId, postId } = req.params;
	const post = await Post.findByPk(postId);
	const tag = await Tag.findOrCreate({
		where: { id: tagId },
		defaults: { id: tagId }
	});

	tag[0].addPost(post);

	const postTag = await PostTag.findOne({
		where: { PostId: postId, TagId: tagId },
	});

	res.status(201).json(
		postTag
	)
};

// BORRADO
const removeTagFromPost = async (req, res) => {
	const { postId, tagId } = req.params;
	await PostTag.destroy({
		where: { PostId: postId, TagId: tagId },
	});
	res.status(204).send();
};

// OBTENER TAGS EN POST POR ID
const getTagsInPostById = async (req, res) => {
	const { postId } = req.params;
	const postTags = await PostTag.findAll({
		where: { PostId: postId },
		include: [{ model: Tag, attributes: ['id', 'name'] }],
	});
	res.status(200).json(postTags);
};

const getPostsWithTagById = async (req, res) => {
	const { tagId } = req.params;
	const tagPosts = await PostTag.findAll({
		where: { TagId: tagId },
		include: [{ model: Post, attributes: ['id', 'texto'] }],
	});
	res.status(200).json(tagPosts);
}

module.exports = {
  addTagToPost,
  removeTagFromPost,
  getTagsInPostById,
	getPostsWithTagById
};