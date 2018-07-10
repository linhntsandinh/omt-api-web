package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.Inject
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{AbsenceApplicationService, UserService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class AbsenceApplicationController@Inject() (deadbolt: DeadboltActions, actorSystem: ActorSystem, absenceapplicationService: AbsenceApplicationService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def load (id: Int)= Action.async{
    absenceapplicationService.load(id)
    Future(JS.OK("value"->"delete Success!!"))
  }
}
