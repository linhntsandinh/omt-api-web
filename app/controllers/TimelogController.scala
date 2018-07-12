package controllers

import akka.actor.ActorSystem
import javax.inject.{Inject, Singleton}
import models.TimelogForm
import play.api.mvc.{AbstractController, ControllerComponents}
import services.TimelogService
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TimelogController @Inject()(actorSystem: ActorSystem, timelogService: TimelogService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def insert = Action.async(parse.json[TimelogForm]) { request =>
    timelogService.insert(request.body)
    Future(Redirect(routes.UserController.index))
  }

  def update = Action.async(parse.json[TimelogForm]) { request =>
    timelogService.update(request.body)
    Future(JS.OK("value" -> "update Success!!"))
  }

  def delete (id: Int)= Action.async{
    timelogService.delete(id)
    Future(JS.OK("value" -> "delete Success!!"))
  }

}
