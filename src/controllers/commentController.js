const { Comment } = require("../../db/models");
const { Post } = require("../../db/models");
const { User } = require("../../db/models");

const addCommentInPost = async (req, res) => {
  /*
  const { postId } = req.params;
  const { texto, userId } = req.body;
  */
  const {texto} = req.body;

  const comment = await Comment.create({
    texto,
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
  const { texto } = req.body;
  await Comment.update({ texto: texto }, { where: { id: commentId } });
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

//solo para probar get, eliminar despues
const getComments = async (_, res) => {
  const comments = await Comment.findAll({});
  res.status(200).json(comments);
};

module.exports = {
  addCommentInPost,
  changeCommentInPost,
  deleteCommentInPost,
  getComments
};
