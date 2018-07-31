package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{DepartmentService, HolidayService}
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

class HolidayController@Inject()(actorSystem: ActorSystem, holidayService: HolidayService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[HolidayForm]) { request =>
    holidayService.insert(request.body).map{x=>
      JS.OK("data" -> "insert Success!!")
    }
  }

  def update = Action.async(parse.json[HolidayData]) { request =>
    holidayService.update(request.body).map{x=>
      JS.OK("data" -> "update Success!!")
    }
  }

  def delete (id: Int)= Action.async{
    holidayService.deleteByRoleId(id).map{x =>
      JS.OK("data" -> "delete Success!!")
    }
  }
}
