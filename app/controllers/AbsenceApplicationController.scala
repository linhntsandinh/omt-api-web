package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.Inject
import models.{AbsenceApplicationsData, AbsenceApplicationsForm, UserRoleForm}
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{AbsenceApplicationService, UserService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class AbsenceApplicationController@Inject() (deadbolt: DeadboltActions, actorSystem: ActorSystem, absenceapplicationService: AbsenceApplicationService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def load (id: Int)= Action.async{
    absenceapplicationService.load(id)
  }
  def insert =Action.async(parse.json[AbsenceApplicationsForm]) { request =>
    val x = absenceapplicationService.insert(request.body)

    x.onComplete {
      rs => {
        println(rs)
      }
    }


    Future(Redirect(routes.UserController.index))
  }
  def update = Action.async(parse.json[AbsenceApplicationsData]){request=>
    absenceapplicationService.update(request.body)
    Future(JS.OK("value"->"update Success!!"))
  }
  def delete (id: Int)= Action.async{
    absenceapplicationService.delete(id)
    Future(JS.OK("value"->"delete Success!!"))
  }

}
