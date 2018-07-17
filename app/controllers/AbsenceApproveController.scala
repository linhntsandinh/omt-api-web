package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.Inject
import models._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{AbsenceApplicationService, AbsenceApproveService, UserService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class AbsenceApproveController@Inject() (deadbolt: DeadboltActions, actorSystem: ActorSystem, absenceApproveService: AbsenceApproveService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert =Action.async(parse.json[AbsenceApproveForm]) { request =>
    val x = absenceApproveService.insert(request.body)

    x.onComplete {
      rs => {
        println(rs)
      }
    }


    Future(Redirect(routes.UserController.index))
  }
  def update = Action.async(parse.json[AbsenceApproveData]){ request=>
    absenceApproveService.update(request.body)
    Future(Redirect(routes.UserController.index))
  }
  def delete (id: Int)= Action.async{
    absenceApproveService.delete(id)
    Future(Redirect(routes.UserController.index))
  }

}
