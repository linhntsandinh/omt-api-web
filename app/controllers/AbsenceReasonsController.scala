package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.Inject
import models._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{AbsenceApplicationService, AbsenceApproveService, AbsenceReasonService, UserService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class AbsenceReasonsController@Inject() (deadbolt: DeadboltActions, actorSystem: ActorSystem, absenceReasonService: AbsenceReasonService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert =Action.async(parse.json[AbsenceReasonsForm]) { request =>
    val x = absenceReasonService.insert(request.body)

    x.onComplete {
      rs => {
        println(rs)
      }
    }


    Future(Redirect(routes.UserController.index))
  }
  def update = Action.async(parse.json[AbsenceReasonsData]){ request=>
    absenceReasonService.update(request.body)
    Future(Redirect(routes.UserController.index))
  }
  def delete (id: Int)= Action.async{
    absenceReasonService.delete(id)
    Future(Redirect(routes.UserController.index))
  }

}
