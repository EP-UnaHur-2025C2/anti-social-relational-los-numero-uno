const { PostTag, Tag, Post } = require("../../db/models");

// AÑADE UNA TAG A UN POST
const addTagToPost = async (req, res) => {
  const { postId } = req.params;
	const post = await Post.findByPk(postId);
	const tags = req.body.Tags || [];
	const promesas = []

  // Asociar tags si los hay
  tags.forEach((t) => {
    promesas.push(
      Tag.findOrCreate({
        where: { Nombre: t.Nombre },
        defaults: t,
      }).then((tagInstance) => {
        const tag = tagInstance[0];
        return post.addTag(tag);
      })
    );
  });

	await Promise.all(promesas);

	res.status(201).json({
		postId: post.id,
		Tags: await post.getTags(
			{ attributes: ['id', 'Nombre'], joinTableAttributes: [] }
		)
	}
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
		attributes: [],
		include: [{ model: Tag, attributes: ['id', 'Nombre'] }],
	});
	res.status(200).json(postTags);
};

const getPostsWithTagById = async (req, res) => {
	const { tagId } = req.params;
	const tagPosts = await PostTag.findAll({
		where: { TagId: tagId },
		attributes: [],
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