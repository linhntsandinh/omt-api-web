package services
import javax.inject.Inject
import models.{DRole, RoleData,RoleForm}
import play.api.mvc.Result
import utils.JS
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.Future

class RoleService @Inject()(drole: DRole){
  def delete(id: Int): Future[Result] = drole.deleteById(id)
  def insert(roleForm: RoleForm): Future[Result] = {
    val roleData = new RoleData(1,roleForm.code,roleForm.name,Some(System.currentTimeMillis()/1000),null)
    drole.insert(roleData)
    Future(JS.OK("data" -> "insert Success!!"))
  }
  def update(roleForm: RoleForm): Future[Result] = {
    drole.update(roleForm)
  }
}
