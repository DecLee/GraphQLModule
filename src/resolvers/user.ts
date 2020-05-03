import mongoose from 'mongoose';
import User from './../models/user.model';
import

export default{
  Query:{
    user: async (_, args) => {
      try {
      let response = await User.findById(args.id)
      return response;
    } catch(e) {
      return e.message;
      }
    },
    users: async () => await User.find({}).exec(),
  },
  Mutation:{
    addUser: addUser: async (parent,args) => {
      try {
        let response = await User.create(args)
        return response;
      } catch(e) {
        return e.message;
      }
    },
  },
};
