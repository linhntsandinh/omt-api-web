package models

import java.sql.Date

import play.api.libs.json.Json
import slick.jdbc.MySQLProfile.api._

case class UserData(id: Option[Int], username: String, password: String, email: String, avatar: String, holidayRemaining: Float, status: Int, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Int], updated_by: Option[Int])
object UserData {
  implicit val reader = Json.reads[UserData]
  implicit val writer = Json.writes[UserData]
}
class UserTableDef(tag: Tag) extends Table[UserData](tag, "users") {
  def id = column[Option[Int]]("id", O.PrimaryKey,O.AutoInc)
  def username = column[String]("username")
  def password = column[String]("password")
  def email = column[String]("email")
  def avatar = column[String]("avatar")
  def holidayRemaining = column[Float]("holiday_remaining")
  def status = column[Int]("status")
  def created_at = column[Option[Long]]("created_at")
  def updated_at = column[Option[Long]]("updated_at")
  def created_by = column[Option[Int]]("created_by")
  def updated_by = column[Option[Int]]("updated_by")
  override def * =
    (id, username, password, email, avatar, holidayRemaining, status, created_at, updated_at, created_by, updated_by) <>((UserData.apply _).tupled, UserData.unapply)
}

case class ProfileData(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: Date, address: String, job_title_id: Int, job_position_id: Int, status: Int, join_date: Date, gender: Int, created_at: Option[Long], updated_at: Option[Long], created_by: Option[Long], updated_by: Option[Long])
class ProfileTableDef(tag: Tag) extends Table[ProfileData](tag, "profiles") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def full_name = column[String]("full_name")

  def phone_number = column[String]("phone_number")

  def birth_date = column[Date]("birth_date")

  def address = column[String]("address")

  def job_title_id = column[Int]("job_title_id")

  def job_position_id = column[Int]("job_position_id")

  def status = column[Int]("status")

  def join_date = column[Date]("join_date")

  def gender = column[Int]("gender")

  def created_at = column[Option[Long]]("created_at")

  def updated_at = column[Option[Long]]("updated_at")

  def created_by = column[Option[Long]]("created_by")

  def updated_by = column[Option[Long]]("updated_by")

  override def * =
    (id, user_id, full_name, phone_number, birth_date, address, job_title_id, job_position_id, status, join_date, gender, created_at, updated_at, created_by, updated_by) <> ((ProfileData.apply _).tupled, ProfileData.unapply)
}

