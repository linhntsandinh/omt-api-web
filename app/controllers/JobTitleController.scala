package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models.TitleData
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{JobTitleService, TimelogService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class JobTitleController @Inject()(actorSystem: ActorSystem, jobTitle: JobTitleService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[TitleData]) { request =>
    jobTitle.insert(request.body).map{x=>
      JS.OK("data" -> "Insert Success!!")
    }
  }

  def update = Action.async(parse.json[TitleData]) { request =>
    jobTitle.update(request.body).map{x=>
      JS.OK("data" -> "update Success!!")
    }
  }

  def delete (id: Int)= Action.async{
    jobTitle.delete(id).map{x=>
      JS.OK("data" -> "Delete Success!!")
    }
  }
}
