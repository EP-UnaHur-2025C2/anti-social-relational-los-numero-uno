const init = async () => {
  const db = require("./db/models").sequelize;
  const { Post, Tag, Post_Image, Usuario, Comment } = require("./db/models");
  await db.sync({ force: true });

  const user = await Usuario.create({
    nickName: "Pepe",
  });

  const post1 = await Post.create({
    descripcion: "Descripción de prueba 1",
    texto: "Prueba Post 1",
  });

  const post2 = await Post.create({
    descripcion: "Descripción de prueba 2",
    texto: "Prueba Post 2",
  });

  const tag1 = await Tag.create({
    nombre: "TAG de prueba",
  });

  const comentario = await Comment.create({
    texto: "Comentario de prueba",
  });

   const comentario2 = await Comment.create({
    texto: "Comentario de prueba2",
  });

  const imagen = await Post_Image.create({
    url: "hhtps://lalala.com",
  });

  await user.addPost(post1);
  await user.addPost(post2);
  await post1.addTag(tag1);
  await post1.addComment(comentario);
  await post1.addComment(comentario2);
};

module.exports = init;
