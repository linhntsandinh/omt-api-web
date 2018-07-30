package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{DepartmentService, HolidayService}

import scala.concurrent.ExecutionContext

class HolidayController@Inject()(actorSystem: ActorSystem, holidayService: HolidayService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[HolidayData]) { request =>
    holidayService.insert(request.body)
  }

  def update = Action.async(parse.json[HolidayData]) { request =>
    println("test")
    holidayService.update(request.body)
  }

  def delete (id: Int)= Action.async{
    holidayService.deleteByRoleId(id)
  }
}
