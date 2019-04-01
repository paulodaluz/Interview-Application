import { newInterview, deleteInterview, searchAllInterview, searchUserInterviews} from "../controller/InterviewController";

const basicAuth = require('../controller/BasicAuth')
export default class InterviewRouter {

    _app;

    constructor(app){
        this._app = app
        this.InterviewRouter()
    }

    InterviewRouter(){

        this._app.post("/newInterview", basicAuth, newInterview)
        this._app.delete("/deleteInterview", basicAuth, deleteInterview )
        this._app.get("/searchAllInterviews", basicAuth, searchAllInterview)
        this._app.get("/searchInterview/:user", basicAuth, searchUserInterviews )

    }
}
