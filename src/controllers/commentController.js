const { Comment } = require("../../db/models");
const { Post } = require("../../db/models");
const { User } = require("../../db/models");

const addCommentInPost = async (req, res) => {
  /*
  const { postId } = req.params;
  const { texto, userId } = req.body;
  */
  const { texto } = req.body;

  const comment = await Comment.create({
    texto,
    createdAt: new Date().toISOString().slice(0, 10) // convierte la fecha a formato ISO YYYY-MM-DD
  });

  /*
  const promesas = []; //Busco post y user para asociar el comentario y luego lo asocio
  promesas.push(Post.findByPk(postId).then((post) => post.addComment(comment)));
  promesas.push(User.findByPk(userId).then((user) => user.addComment(comment)));
  await Promise.all(promesas);
  res.status(201).json({
      ...comment.dataValues,
      user: await User.findByPk(userId),
      post: await Post.findByPk(postId),
    });
*/
  res.status(201).json(comment);
};

const changeCommentInPost = async (req, res) => {
  const { commentId } = req.params;
  const { texto, createdAt } = req.body;
  await Comment.update({ texto: texto, createdAt: createdAt}, { where: { id: commentId } });
  const comment = await Comment.findByPk(commentId, {
    attributes: ["id", "texto", "createdAt"],
  });
  res.status(200).json(comment);
};

const deleteCommentInPost = async (req, res) => {
  const { commentId } = req.params;
  await Comment.destroy({ where: { id: commentId } });
  res.status(204).send();
};

const getComments = async (_, res) => {
  const comments = await Comment.findAll({});
  res.status(200).json(comments);
};

const getVisibleComments = async (_, res) => {
  const comments = await Comment.findAll({ attributes: ["id", "texto", "createdAt"] });
  const visibles = comments.filter((c) => c.visible);
  res.status(200).json(visibles);
};

const getCommentById = async (req, res) => {
  const { commentId } = req.params;
  const comment = await Comment.findByPk(commentId, {});
  res.status(200).json(comment);
}

const getCommentsInPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);
  const comments = await post.getComments();
  res.status(200).json(comments);
}

const getUserCommentsById = async (req, res) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  const comments = await user.getComments();
  res.status(200).json(comments);
}

const getUserCommentsInPostById = async (req, res) => {
  const { postId, userId } = req.params;
  const post = await Post.findByPk(postId);
  const comments = await post.getComments({ where: { userId: userId } });
  res.status(200).json(comments);
}

const getCommentsInDate = async (req, res) => {
  const { createdAt } = req.body;
  const comments = await Comment.findAll({ where: { createdAt: createdAt } });
  res.status(200).json(comments);
}

const getAmountCommentsInPostById = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findByPk(postId);
  const comments = await post.getComments();
  res.status(200).json({ cantidadComentarios: comments.length });
}

module.exports = {
  addCommentInPost,
  changeCommentInPost,
  deleteCommentInPost,
  getComments,
  getVisibleComments,
  getCommentById,
  getCommentsInPostById,
  getUserCommentsById,
  getUserCommentsInPostById,
  getCommentsInDate,
  getAmountCommentsInPostById
};
