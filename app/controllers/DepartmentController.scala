package controllers

import akka.actor.ActorSystem
import javax.inject.Inject
import models._
import play.api.mvc.{AbstractController, ControllerComponents}
import services.{DepartmentService}

import scala.concurrent.ExecutionContext

class DepartmentController@Inject()(actorSystem: ActorSystem, departmentService: DepartmentService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {
  def insert = Action.async(parse.json[DepartmentData]) { request =>
    departmentService.insert(request.body)
  }

  def update = Action.async(parse.json[DepartmentData]) { request =>
    println("test")
    departmentService.update(request.body)
  }

  def delete (id: Int)= Action.async{
    departmentService.deleteByRoleId(id)
  }
}