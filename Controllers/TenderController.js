const TenderModel = require('../models/tender')


class TenderController {

    static Tender_insert = async (req ,res) => {
        try {
            const { name, description, start_time, end_time, buffer_time } = req.body
           // const result = new TenderModel(req.body)
            const result = new TenderModel({
                name: name,
                description: description,
                start_time: start_time,
                end_time: end_time,
                buffer_time: buffer_time

            })
            if (!result) {
                return res.status(404).json({ status: "fail", message: "tender data not found" })
            }
            const savetender = await result.save()
            res.status(200)
                .json({ status: "success", message: "tender registration", savetender })

        } catch (error) {
            res
                .status(590)
                .json({ status: "failed", message: error.message })


        }
    }

    static tenderdisplay = async(req ,res) =>{
        try{
            const tender = await TenderModel.find();
            res.status(200).json(tender)
        } catch (error) {
            res.status(400)
            .json({status: "failed", message: error.message})
        }
    }



    // delete api
static tenderdelete = async (req, res) => {
    try {
        const data = await TenderModel.findByIdAndDelete(req.params.id)
        res
            .status(200)
            .json({ status: "success", message: "Tender deleted successfully 😃🍻" });
    } catch (err) {
        console.log(err)
    }
  }

  static getSingleTender = async (req , res) =>{
    try{
        const data = await TenderModel.findById(req.params.id)
        res.status(200).json({
            success: true,
            data
        })

    }catch (error) {
        console.log(error)
    }
  }







}

module.exports = TenderController