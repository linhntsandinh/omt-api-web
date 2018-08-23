package controllers

import akka.actor.ActorSystem
import javax.inject.{Inject, Singleton}
import models.{TimelogForm, TimelogLoadRequest}
import play.api.mvc.{AbstractController, ControllerComponents}
import services.TimelogService
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class TimelogController @Inject()(actorSystem: ActorSystem, timelogService: TimelogService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def insert = Action.async(parse.json[TimelogForm]) { request =>
    timelogService.insert(request.body).map{ x =>
     JS.OK("data" -> x)
    }
  }

  def update = Action.async(parse.json[TimelogForm]) { request =>
    timelogService.update(request.body).map { x =>
     JS.OK("TimelogId" -> "update Success!!")
    }
  }

  def delete (id: Int)= Action.async{
    timelogService.delete(id).map{x=>
      JS.OK("data" -> "delete Success!!")
    }
  }

  def load = Action.async(parse.json[TimelogLoadRequest]) { request =>
    timelogService.load(request.body)
  }

  def count(date: String) = Action.async{
    timelogService.count(date)
  }
}
