var events = [
    {id:0 , title:"Tennis at Anne Morrison", coordinator:"Pepper Pots", date:"10/31/2016", time:"9:40am", location:"Anne Morrison", description: "Couples tournament were we do fun stuff, fancy."},
    {id:1 , title:"Hike Table Rock", coordinator:"Someone Funny", date:"10/31/2016", time:"10:10am", location:"Green Belt", description: "Hike from Boise State to Table Rock."},
    {id:2 , title:"Cheese and Wine", coordinator:"JOHN SMITH", date:"11/01/2016", time:"11:10am", location:"Gold's Gym", description: "Eat food and Party."},
    {id:3 , title:"Learn to Kayak", coordinator:"JESSICA WONG", date:"11/01/2016", time:"3:10Pm", location:"BSU Rec Center", description: "Learn to sew."},
    {id:4 , title:"Self Defense classes", coordinator:"LAURA TAYLOR", date:"11/01/2016", time:"2:00pm", location:"Veterans Memorial", description: "Punch stuff."}
];

exports.findAll = function (req, res, next) {
    res.send(events);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(events[id]);
};