package models

import java.sql.Date

import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json

import scala.concurrent.{ExecutionContext, Future}
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._


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


case class ProfileForm(id: Option[Int], user_id: Int, full_name: String, phone_number: String, birth_date: String, address: String, job_title_id: Int, job_position_id: Int, status: Int, join_date: String, gender: Int)
object ProfileForm {
  implicit val reader = Json.reads[ProfileForm]
  implicit val writer = Json.writes[ProfileForm]

}


class ProfileFormDef(tag: Tag) extends Table[ProfileForm](tag, "profiles") {
  def id = column[Option[Int]]("id", O.PrimaryKey, O.AutoInc)

  def user_id = column[Int]("user_id")

  def full_name = column[String]("full_name")

  def phone_number = column[String]("phone_number")

  def birth_date = column[String]("birth_date")

  def address = column[String]("address")

  def job_title_id = column[Int]("job_title_id")

  def job_position_id = column[Int]("job_position_id")

  def status = column[Int]("status")

  def join_date = column[String]("join_date")

  def gender = column[Int]("gender")

  override def * =
    (id, user_id, full_name, phone_number, birth_date, address, job_title_id, job_position_id, status, join_date, gender) <> ((ProfileForm.apply _).tupled, ProfileForm.unapply)
}


class Profile @Inject()(protected val dbConfigProvider: DatabaseConfigProvider)
                       (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {

  private val ProfileForm = TableQuery[ProfileFormDef]

  private val ProfileTable = TableQuery[ProfileTableDef]

  def insert(profileData: ProfileData): Future[Int] = {
    db.run(ProfileTable += profileData)
  }

  def delete(profileId: Int) = {
    db.run(ProfileTable.filter(_.id === profileId).delete)
  }

  def update(profileForm: ProfileForm) = {
    val q = ProfileForm.filter(_.id === profileForm.id).update(profileForm)
    db.run(q)
  }
}
