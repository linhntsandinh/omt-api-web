package security

import be.objectify.deadbolt.scala.models.Permission
import models.UserData
import play.api.libs.json.Json

case class SecurityPermission(value : String) extends Permission
object SecurityPermission {
  implicit val reader = Json.reads[SecurityPermission]
  implicit val writes = Json.writes[SecurityPermission]

}
