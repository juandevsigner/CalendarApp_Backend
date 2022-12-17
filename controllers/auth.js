const {response} = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { getJWT } = require('../helpers/jwt')


const createUser = async(req,res = response)=>{
    const {email, password} = req.body

    try {

    let user = await User.findOne({email})

    if(user){
         return res.status(400).json({
            ok: false,
            msg: 'User already exists'
         })
    }

    user = new User(req.body)
    const salt = bcrypt.genSaltSync()
    user.password = bcrypt.hashSync(password, salt)
    const token = await getJWT(user.id, user.name)
    await user.save()

    res.status(201).json({
        ok: true,
        uid: user.id,
        name: user.name,
        token
    })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error, speak with admin',
        })
    }
}

const loginUser = async(req,res)=>{
    const { email, password } = req.body

    try {
    const user = await User.findOne({email})

    if(!user){
         return res.status(400).json({
            ok: false,
            msg: 'User does not exists'
         })
    }

    const validPassword = bcrypt.compareSync(password, user.password)

    if(!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Password incorrect'
        })
    }

    const token = await getJWT(user.id, user.name)

    res.json({
        ok: true,
        uid: user.id,
        name: user.name,
        token
    })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error, speak with admin',
        })
    }
}

const validateToke = async(req,res)=>{
    const {uid, name} = req
    const token = await getJWT(uid,name)
    res.json({
        ok: true,
        token
    })
}

module.exports = {
    createUser,
    validateToke,
    loginUser
}