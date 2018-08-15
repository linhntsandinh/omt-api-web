package controllers

import akka.actor.ActorSystem
import be.objectify.deadbolt.scala.DeadboltActions
import javax.inject.{Inject, Singleton}
import models.ProfileForm
import play.api.mvc.{AbstractController, ControllerComponents}
import services.ProfileService
import utils.JS

import scala.concurrent.{ExecutionContext, Future}

@Singleton
class ProfileController  @Inject()(deadbolt: DeadboltActions, actorSystem: ActorSystem, profileService: ProfileService, cc: ControllerComponents)(implicit executionContext: ExecutionContext) extends AbstractController(cc) {

  def insert = Action.async(parse.json[ProfileForm]) { request =>
    profileService.insert(request.body).flatMap{ x=>
      Future(JS.OK("data" -> "insert success!!"))
    }
  }

  def getProfile(id: Int) = Action.async{
    profileService.getProfile(id)
  }
  def loadProfile = Action.async{
    profileService.loadProfile
  }

  def update = Action.async(parse.json[ProfileForm]) { request =>
    profileService.update(request.body).map{x =>
      JS.OK("data" -> "update success!!")
    }
  }

  def delete (id: Int)= Action.async{
    profileService.delete(id).map{x =>
      JS.OK("data" -> "delete success!!")
    }
  }
}
