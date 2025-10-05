const { Comment } = require("../../db/models");

const getCommentsByUserInPost = async (req, res) => {
  const { userId, postId } = req.params;
  const comments = await Comment.findAll({
    where: { userId, postId },
    attributes: ["texto"],
    include: [{ model: User, attributes: ["username"] }],
  });

  res.status(200).json(comments);
};

const getCommentsInPost = async (req, res) => {
  const { postId } = req.params;
  const comments = await Comment.findAll({
    where: { postId },
    attributes: ["texto"],
    include: [
      { model: Post, attributes: ["texto"] },
      { model: User, attributes: ["username"] },
    ],
  });
  res.status(200).json(comments);
};

const getCommentsById = async (req, res) => {
  const { userId } = req.params;
  const comments = await Comment.findAll({
    where: { userId },
    attributes: ["texto"],
    include: [{ model: User, attributes: ["texto"] }],
  });
  res.status(200).json(comments);
};

const addCommentInPost = async (req, res) => {
  const { userId, postId } = req.params;
  const { texto } = req.body;
  const comment = await Comment.create({
    texto,
    userId,
    postId,
  });
  res.status(201).json(comment);
};

const changeCommentInPost = async (req, res) => {
  const { commentId } = req.params;
  const { texto } = req.body;
  await Comment.update({ texto }, { where: { id: commentId } });
  const comment = await Comment.findByPk(commentId, {
    attributes: ["id", "texto"],
  });
  res.status(200).json(comment);
};

const deleteCommentInPost = async (req, res) => {
  const { commentId } = req.params;
  await Comment.destroy({ where: { id: commentId } });
  res.status(204).send();
};

module.exports = {
  getCommentsByUserInPost,
  getCommentsInPost,
  getCommentsById,
  addCommentInPost,
  changeCommentInPost,
  deleteCommentInPost,
};
