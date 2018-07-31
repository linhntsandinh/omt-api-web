package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{DepartmentService, HolidayService, WorkingDayService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class WorkingDayController@Inject()(actorSystem: ActorSystem, workingDayService: WorkingDayService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[WorkingDayForm]) { request =>
    workingDayService.insert(request.body).map{x=>
      JS.OK("data" -> "insert Success!!")
    }
  }

  def update = Action.async(parse.json[WorkingDayForm]) { request =>
    workingDayService.update(request.body).map{x=>
      JS.OK("data" -> "update Success!!")
    }
  }

  def delete (id: Int)= Action.async{
    workingDayService.delete(id).map{x =>
      JS.OK("data" -> "delete Success!!")
    }
  }
}
