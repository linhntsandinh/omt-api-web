package controllers

import javax.inject.{Inject, Singleton}
import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import models.{LoginForm, UserData, UserForm}
import services.UserService
import play.api.data.Form
import play.api.data.Forms.mapping
import play.api.data.Forms.text
import play.api.libs.json.Json
import play.api.mvc.{AbstractController, ControllerComponents}
import play.mvc.Action
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class UserController @Inject()(deadbolt: DeadboltActions, actorSystem: ActorSystem, userService: UserService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def login = Action.async(parse.json[LoginForm]) { req =>
    userService.login(req.body)
  }

  def delete(id: Int) = Action.async {
    userService.delete(id)
    Future(JS.OK("value" -> "delete Success!!"))
  }


  def update = Action.async(parse.json[UserData]) { request =>
    userService.update(request.body)
    Future(JS.OK("value" -> "update Success!!"))
  }

  def index = deadbolt.Restrict(List(Array("admin")))() { authRequest =>
    val x = authRequest.session
    Future(Ok(views.html.user()))
  }

  def insert = Action.async(parse.json[UserForm]) { request =>
    val x = userService.insert(request.body)

    x.onComplete {
      rs => {
        println(rs)
      }
    }


    Future(Redirect(routes.UserController.index))
  }
}
