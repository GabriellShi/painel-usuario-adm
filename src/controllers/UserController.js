const fs = require("fs");
const files = require("../helpers/files");
const upload = require("../config/upload")
const users = [
  {
    id: 1,
    nome: "Roberto",
    sobrenome: "Silva",
    email: "robertinho123@email.com",
    idade: 27,
    avatar: "user9.jpeg",
  },
  {
    id: 2,
    nome: "Ana",
    sobrenome: "Monteiro",
    email: "aninha123@email.com",
    idade: 22,
    avatar: "user3.jpeg",
  },
 
];

const userController = {
  index: (req, res) => {
    const usersWithBase64Avatar = users.map((user) => ({
      ...user,
      avatar: files.base64Encode(upload.path + user.avatar),
    }));
    
    return res.render("users", {
      title: "Lista de usuários",
      users: usersWithBase64Avatar,
    });
    
  },
  show: (req, res) => {
    // Pega o parametro que vem da url, ou seja, na url a baixo, pegaria o valor 4
    // localhost:3000/user/4
    // id = 4
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Usuário não encontrado",
      });
    }
    const user = {
      ...userResult,
      avatar: files.base64Encode(
        upload.path + userResult.avatar
      ),
    };
    return res.render("user", {
      title: "Visualizar usuário",
      user,
    });
  },
  create: (req, res) => {
    return res.render("user-create", { title: "Cadastrar usuário" });
  },
  store: (req, res) => {
    const { nome, sobrenome, idade, email } = req.body;
    let filename = "user-default.jpeg";
    if (req.file) {
      filename = req.file.filename;
    }
    const newUser = {
      id: users.length + 1,
      nome,
      sobrenome,
      idade,
      email,
      avatar: filename,
    };
    users.push(newUser);
    return res.render("success", {
      title: "Sucesso!",
      message: "Usuário criado com sucesso!",
    });
  },
  edit: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    return res.render("user-edit", {
      title: "Editar usuário",
      user: userResult,
    });
  },
  update: (req, res) => {
    const { id } = req.params;
    const { nome, sobrenome, idade, email } = req.body;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    let filename;
    if (req.file) {
      filename = req.file.filename;
    }
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const updateUser = userResult;
    if (nome) updateUser.nome = nome;
    if (sobrenome) updateUser.sobrenome = sobrenome;
    if (email) updateUser.email = email;
    if (idade) updateUser.idade = idade;
    if (filename) {
      let avatarTmp = updateUser.avatar;
      fs.unlinkSync(upload.path + avatarTmp);
      updateUser.avatar = filename;
    }
    return res.render("success", {
      title: "Usuário atualizado",
      message: `Usuário ${updateUser.nome} foi atualizado`,
    });
  },
  delete: (req, res) => {
    const { id } = req.params;
    const userResult = users.find((user) => user.id === parseInt(id));
    // const userResult = users.find((user) => user.id.toString() === id);
    if (!userResult) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    const user = {
      ...userResult,
      avatar: files.base64Encode(
        upload.path + userResult.avatar
      ),
    };
    return res.render("user-delete", {
      title: "Deletar usuário",
      user,
    });
  },
  destroy: (req, res) => {
    const { id } = req.params;
    const result = users.findIndex((user) => user.id === parseInt(id));
    if (result === -1) {
      return res.render("error", {
        title: "Ops!",
        message: "Nenhum usuário encontrado",
      });
    }
    fs.unlinkSync(upload.path + users[result].avatar);
    users.splice(result, 1);
    return res.render("success", {
      title: "Usuário deletado",
      message: "Usuário deletado com sucesso!",
    });
  },
};

module.exports = userController;
