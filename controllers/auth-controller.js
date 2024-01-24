const prisma = require("../config/prisma");
const createError = require("../utils/createError");

exports.register = async (req, res, next) => {
  try {
    const { email, password, bio } = req.body;

    const userExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExist) {
      return createError(400, "User already exist");
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        profile: {
          create: {
            bio,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(201).json({ user: newUser });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try{
    const { email , password } = req.body;

    const userExist = await prisma.user.findFirst({
      where: {
        email
      },
      // show only email and id
      // select: {
      //   email:true,
      //   id:true
      // }
    });

    if(!userExist){
      return createError(400,"user not found")
    }
    if(password !== userExist.password){
      return createError(400,"password not match")
    }


  res.status(201).json({ user : userExist });
  }
  catch(err){
    next(err)
  }
};
