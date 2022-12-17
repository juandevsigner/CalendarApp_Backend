const Event = require('../models/Event')

const getEvents = async(req, res) => {
   const event = await Event.find().populate('user', 'name')
   res.status(200).json({
    event: event
   })
}

const createEvent =async (req, res) => {

    const event = new Event(req.body)

    try {
        event.user = req.uid
        const eventDb = await event.save()
        res.json({
            ok: true,
            eventDb
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Was error: Talk with admin'
        })
    }
}

const updateEvent = async(req, res) => {
   const eventId = req.params.id
   const uid = req.uid
   try {

    const event = await Event.findById(eventId)

    if(!event) {
        return res.status(404).json({
            ok: false,
            msg:'Event not found'
        })
    }

    if(event.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg:'Action not valid'
        })
    }

    const newEvent = {
        ...req.body,
        user: uid
    }

    const eventUpdate = await Event.findByIdAndUpdate(eventId, newEvent, {new: true})


    res.json({
        ok: true,
        event: eventUpdate
    })

   } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Was error: Talk with admin'
        })
   }
}

const deleteEvent = async(req, res) => {
    const eventId = req.params.id
   const uid = req.uid
   try {

    const event = await Event.findById(eventId)

    if(!event) {
        return res.status(404).json({
            ok: false,
            msg:'Event not found'
        })
    }

    if(event.user.toString() !== uid){
        return res.status(401).json({
            ok: false,
            msg:'Action not valid'
        })
    }

    const deleteEvent = {
        ...req.body,
        user: uid
    }

   await Event.findByIdAndDelete(eventId)

    res.json({
        ok: true,
        msg: 'Event was delete correctly'
    })

   } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'Was error: Talk with admin'
        })
   }
}

module.exports ={
    deleteEvent,
    updateEvent,
    createEvent,
    getEvents
}