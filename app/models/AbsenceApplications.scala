package models


import javax.inject.Inject
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import play.api.libs.json.Json
import play.api.mvc.Result
import slick.jdbc.JdbcProfile
import slick.jdbc.MySQLProfile.api._

import scala.collection.mutable.ListBuffer
import scala.concurrent.{ExecutionContext, Future}
class AbsenceApplications @Inject() (protected val dbConfigProvider: DatabaseConfigProvider)
                                               (implicit executionContext: ExecutionContext)
  extends HasDatabaseConfigProvider[JdbcProfile] {
  private val AbsenceTable = TableQuery[AbsenceApplicationsTableDef]
  private val AbsenceReasonsTable = TableQuery[AbsenceReasonsTableDef]
  private val ProfileTable = TableQuery[ProfileTableDef]
  private val UserTable = TableQuery[UserTableDef]
  private val AbsenceApproveTable = TableQuery[AbsenceApproveTableDef]
  def load(absenceRequestLoad: AbsenceRequestLoad): Future[Option[(ListBuffer[AbsenceApplicationsLoad],Int)]] = {
    val listAbsence = ListBuffer.empty[AbsenceApplicationsLoad]
    val q = (((((AbsenceTable join AbsenceReasonsTable)
      .on(_.reasonId === _.id) join ProfileTable)
      .on(_._1.userId === _.user_id) join AbsenceApproveTable)
      .on(_._1._1.id === _.application_id)join ProfileTable)
      .on(_._2.approve_id === _.user_id)).filter(_._1._1._1._1.userId === absenceRequestLoad.id).filter(row =>
      if(absenceRequestLoad.reciever !="") row._2.full_name === absenceRequestLoad.reciever
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.start != 0) row._1._1._1._1.startTime === absenceRequestLoad.start
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.writer != "") row._1._1._2.full_name === absenceRequestLoad.writer
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.reasons != "") row._1._1._1._2.title === absenceRequestLoad.reasons
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.total != 0) row._1._1._1._1.totalTime === absenceRequestLoad.total
      else LiteralColumn(true)
      ).filter(row =>
      if(absenceRequestLoad.ordervalue >= 0) row._1._1._1._1.status === absenceRequestLoad.ordervalue
      else LiteralColumn(true)
    )
      .drop(absenceRequestLoad.offset).take(absenceRequestLoad.limit).result
    //
    val rs = db.run {
      q
    }
//    rs.map {
//      list => {
//        list.size match {
//          case 0 => None
//          case _ => {
//            var i=0
//            list.foreach {
//              item => {
//                val itemLoad : AbsenceApplicationsLoad =
//                  new AbsenceApplicationsLoad(item._1._1._1._1.id,item._1._1._1._2.title,item._1._1._2.full_name,item._2.full_name,item._1._1._1._1.startTime,item._1._1._1._1.totalTime,item._1._1._1._1.status)
//                listAbsence += itemLoad
//              }
//            }
//            Some(listAbsence,list.size)
//          }
//        }
//      }
//    }
    val p = (((((AbsenceTable join AbsenceReasonsTable)
      .on(_.reasonId === _.id) join ProfileTable)
      .on(_._1.userId === _.user_id) join AbsenceApproveTable)
      .on(_._1._1.id === _.application_id)join ProfileTable)
      .on(_._2.approve_id === _.user_id)).filter(_._1._1._1._1.userId === absenceRequestLoad.id).filter(row =>
      if(absenceRequestLoad.reciever !="") row._2.full_name === absenceRequestLoad.reciever
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.start != 0) row._1._1._1._1.startTime === absenceRequestLoad.start
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.writer != "") row._1._1._2.full_name === absenceRequestLoad.writer
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.reasons != "") row._1._1._1._2.title === absenceRequestLoad.reasons
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.total != 0) row._1._1._1._1.totalTime === absenceRequestLoad.total
      else LiteralColumn(true)
    ).filter(row =>
      if(absenceRequestLoad.ordervalue >= 0) row._1._1._1._1.status === absenceRequestLoad.ordervalue
      else LiteralColumn(true)
    ).result
    val rs1 = db.run{
      p
    }
    for{
      fs <- rs
      fs1 <- rs1
    } yield {
        fs.size match {
          case 0 => None
          case _ => {
            var i=0
            fs.foreach {
              item => {
                val itemLoad: AbsenceApplicationsLoad =
                  new AbsenceApplicationsLoad(item._1._1._1._1.id, item._1._1._1._2.title, item._1._1._2.full_name, item._2.full_name, item._1._1._1._1.startTime, item._1._1._1._1.totalTime, item._1._1._1._1.status)
                listAbsence += itemLoad
              }
            }
          }
        }
      Some(listAbsence,fs1.size)
      }
  }
  def loadDetail(id : Int):  Future[Option[(AbsenceApplicationsLoad,AbsenceApplicationsData)]]={
    val listAbsence = ListBuffer.empty[AbsenceApplicationsLoad]
    val q = (((((AbsenceTable join AbsenceReasonsTable)
      .on(_.reasonId === _.id) join ProfileTable)
      .on(_._1.userId === _.user_id) join AbsenceApproveTable)
      .on(_._1._1.id === _.application_id)join ProfileTable)
      .on(_._2.approve_id === _.user_id)).filter(_._1._1._1._1.id ===id)
      .result
    //
    val rs = db.run {
      q
    }
    rs.map {
      list => {
        list.size match {
          case 0 => None
          case _ => {
            var itemLoad : AbsenceApplicationsLoad = null;
            var itemData : AbsenceApplicationsData = null;
            list.foreach {
              item => {
                itemLoad =
                  new AbsenceApplicationsLoad(item._1._1._1._1.id,item._1._1._1._2.title,item._1._1._2.full_name,item._2.full_name,item._1._1._1._1.startTime,item._1._1._1._1.totalTime,item._1._1._1._1.status)
                itemData = item._1._1._1._1
              }
            }
            Some(itemLoad,itemData)
          }
        }
      }
    }
  }
  def insert(result: AbsenceApplicationsData): Future[Int] = {
    db.run(AbsenceTable += result)
  }
  def delete(Id: Int): Future[Int] = {
    db.run(AbsenceTable.filter(_.id === Id).delete)
  }
  def loadForm(id : Int): Future[Option[(Seq[AbsenceReasonsData], ListBuffer[String], Seq[ProfileData])]] = {
//
    var listName = new ListBuffer[String]
    var listReason : Seq[AbsenceReasonsData] = null
    var profileLoad : Seq[ProfileData]= null
    val q = AbsenceReasonsTable.result
    val rs = db.run {
      q
    }
//    rs.map {
//      list => {
//        listReason = list
//      }
//    }
    val a = ProfileTable.filter(_.user_id === id).result
    val rss = db.run {
      a
    }
//    rss.map {
//      list => {
//        profileLoad = list
//      }
//    }
    val p = ((UserTable join ProfileTable).on(_.id === _.user_id) join ProfileTable).on(_._2.job_title_id === _.job_title_id)
      .filter(_._1._1.id=== id).result
    val r = db.run {
      p
    }
//    r.map {
//      list => {
//        list.foreach {
//          item => {
//            val itemName: String = item._2.full_name
//            listName += itemName
//          }
//        }
//      }
//    }

//    #1
//    rss.zip(r).zip(rs).map{
//      case ((rss1,r1),rs1) => {
//        profileLoad = rss1
//          r1.foreach {
//            item => {
//              val itemName: String = item._2.full_name
//              listName += itemName
//            }
//          }
//        listReason = rs1
//        Some(listReason,listName,profileLoad)
//      }
//    }

    for{
      r1 <- r
      rs1 <- rs
      rss1 <- rss
    } yield {
      profileLoad = rss1
      r1.foreach {
        item => {
          val itemName: String = item._2.full_name
          listName += itemName
        }
      }
      listReason = rs1
      Some(listReason,listName,profileLoad)
    }

  }

  def update(absenceApplicationsData: AbsenceApplicationsData)={
    val q = AbsenceTable.filter(_.id === absenceApplicationsData.id).update(absenceApplicationsData)
    db.run(q)
  }
}
  case class AbsenceApplicationsLoad(id: Int, reasonTitle: String, writer: String,reciever: String,startTime :Int,totalTime :Float,status :Int)
  object AbsenceApplicationsLoad {
    implicit val reader = Json.reads[AbsenceApplicationsLoad]
    implicit val writer = Json.writes[AbsenceApplicationsLoad]
  }

  case class AbsenceRequestLoad(id: Int, offset :Int, limit :Int, start:Int, writer: String, reciever: String,reasons: String,total :Float,ordervalue:Int)
  object AbsenceRequestLoad {
    implicit val reader = Json.reads[AbsenceRequestLoad]
    implicit val writer = Json.writes[AbsenceRequestLoad]
  }

  case class AbsenceApplicationsData(id: Int, reasonId: Int, description: String, startTime: Int, endTime: Int, status:Int, userId:Int, totalTime:Float, created_at: Option[Long], updated_at: Option[Long], update_by: Option[Int], created_by: Option[Int])
  object AbsenceApplicationsData {
    implicit val reader = Json.reads[AbsenceApplicationsData]
    implicit val writer = Json.writes[AbsenceApplicationsData]

  }
  class AbsenceApplicationsTableDef(tag: Tag) extends Table[AbsenceApplicationsData](tag, "absence_applications") {
    def id = column[Int]("id", O.PrimaryKey,O.AutoInc)
    def reasonId = column[Int]("reason_id")
    def description = column[String]("description")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def status = column[Int]("status")
    def userId = column[Int]("user_id")
    def totalTime = column[Float]("total_time")
    def created_at = column[Option[Long]]("created_at")
    def updated_at = column[Option[Long]]("updated_at")
    def created_by = column[Option[Int]]("created_by")
    def updated_by = column[Option[Int]]("updated_by")
    override def * =
      (id, reasonId, description, startTime, endTime, status, userId, totalTime, created_at, updated_at, updated_by, created_by) <>((AbsenceApplicationsData.apply _).tupled, AbsenceApplicationsData.unapply)
  }

  case class AbsenceApplicationsForm(reasonId: Int, description: String, startTime: Int, endTime: Int, status:Int, userId:Int, totalTime:Float)
  object AbsenceApplicationsForm {
    implicit val reader = Json.reads[AbsenceApplicationsForm]
    implicit val writes = Json.writes[AbsenceApplicationsForm]
  }
  class AbsenceApplicationFormTableDef(tag: Tag) extends Table[AbsenceApplicationsForm](tag, "absence_applications") {
    def reasonId = column[Int]("reason_id")
    def description = column[String]("description")
    def startTime = column[Int]("start_time")
    def endTime = column[Int]("end_time")
    def status = column[Int]("status")
    def userId = column[Int]("user_id")
    def totalTime = column[Float]("total_time")
    override def * =
      (reasonId, description, startTime, endTime, status, userId, totalTime) <>((AbsenceApplicationsForm.apply _).tupled, AbsenceApplicationsForm.unapply)
  }

