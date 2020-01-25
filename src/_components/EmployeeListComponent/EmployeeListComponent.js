import React from 'react';
import * as Const from '../../_constants/api.constants';
import { Col, Accordion, Button, Card } from 'react-bootstrap';
import WCard from '../CardComponent/WCard';
import styles from '../../styles/Styles';
import Helpers from '../../_helpers/helpers.js';

class EmployeeListComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      employeeList: [
        {
          eid: '123456',
          name: "Muhammad",
          idbarahno: "123456",
          emailaddress: "muhammad.hoti@mrhe.ae",
          unifiednumber: "123",
          mobileno: '971556987007'
        },
        {
          eid: '123457',
          name: "Zameem",
          idbarahno: "123457",
          emailaddress: "zameem@mrhe.ae",
          unifiednumber: "234",
          mobileno: '971556987008'

        },
        {
          eid: '123458',
          name: "Hameez",
          idbarahno: "123458",
          emailaddress: "hameez@mrhe.ae",
          unifiednumber: "456",
          mobileno: '971556987009'
        }
      ],
      addEmployee: false,
      editIndex: null,
      data: {},
      response: '',
      showImages: false,
      openCursor : '+'
    }

    this.updateEId = this.updateEId.bind(this);
    this.updateName = this.updateName.bind(this)
    this.updateIdbarahNo = this.updateIdbarahNo.bind(this)
    this.updateEmailAddress = this.updateEmailAddress.bind(this)
    this.updateUnifiednumber = this.updateUnifiednumber.bind(this)
    this.updateMobileNo = this.updateMobileNo.bind(this);
    this.bindCard = this.bindCard.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

  }

  componentDidMount() {
    console.log("componentDidMount");
    this.getApiData();
  }

  //#region getApiData - bindCard - handleDownloadImage
  getApiData() {
    let bodyParams = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'consumer-key': Const.CONSUMERKEY,
      'consumer-secret': Const.CONSUMERSECRET
    }
    fetch(Const.GETAPI, {
      method: 'get',
      dataType: 'json',
      headers: bodyParams
    }).then(
      data => data.json()
    ).then(data => {
      console.log("data");
      console.log(data);
      this.setState({
        response: data
      })
    }).catch(function () {
      console.log("error in Get");
    });
  }

  bindCard() {
    const { response } = this.state;
    let cardDataResponse;
    const elements = [];
    if (response !== undefined && response.success) {
      cardDataResponse = response.payload;
      cardDataResponse.map((item,i) => {
        elements.push(
          <Col key={i} md={4} lg={4} xl={4}>
            <WCard
              key={i}
              image={item.image}
              cardtitletext={item.title.substring(0, 40)}
              cardsubtitletext={item.description.substring(0, 40)}
              date={item.date}
              handleClick={() => { this.handleDownloadImage(item) }}
            />
          </Col>
        );
        return 0;
      });
      return (elements);
    } else {
      return (
        <div style={styles.AppHeader}>
          <h2> Loading...</h2>
        </div>
      )
    }
  }

  // chrome.exe --disable-web-security --user-data-dir=c:\my\data
  handleDownloadImage(item) {
    this.setState({
      showImages: true,
      loading: true,
    }, () => {
      Helpers.httpRequest(
        item.image,
        'get',
      )
        .then((response) => response.blob())
        .then((blob) => {
          // create blob link
          const url = window.URL.createObjectURL(new Blob([blob]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `Image.jpg`);

          // append to html
          document.body.appendChild(link);

          // download
          link.click();

          // remove
          link.parentNode.removeChild(link);

          this.setState({
            loading: false
          });
        })
        .catch((error) => {
          error.json().then((json) => {
            this.setState({
              errors: json,
              loading: false
            });
          })
        });
    });

    event.preventDefault();

  }

  //#endregion

  //#region Add - Edit - Cancel - Delete Employee
  validateEmail(data) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data)) {
      return (true)
    }
    alert("You have entered an invalid email address!")
    return (false)
  }

  addEmployee() {
    this.setState({
      addEmployee: true,
      empIDFld: '',
      userNameFld: '',
      iDBarahNumFld: '',
      unifiedNumFld: '',
      mobileNumFld: ''
    });
  }
  cancelAddEmployee() {
    this.setState({
      addEmployee: false
    });
  }
  editEmployee(index) {
    this.setState({
      editIndex: index
    });
  }

  deleteEmployee(index) {
    let empList = this.state.employeeList;
    empList.splice(index, 1)
    this.setState({
      empList
    });
  }


  canceleditEmployee() {
    this.setState({
      editIndex: null
    });
  }
  //#endregion

  //#region UPDATE
  updateEmployee() {

    alert("Update functionality is disabled and this for Demo Purpose only(can be enabled)");
    // let edI = this.state.editIndex;
    // this.state.editedEId && (this.state.employeeList[edI].eid = this.state.editedEId)
    // this.state.editedName && (this.state.employeeList[edI].name = this.state.editedName)
    // this.state.editedIdbarahNo && (this.state.employeeList[edI].idbarahno = this.state.editedIdbarahNo)
    // this.state.editedEmailaddress && (this.state.employeeList[edI].emailaddress = this.state.editedEmailaddress)
    // this.state.editedUnifiednumber && (this.state.employeeList[edI].unifiednumber = this.state.editedUnifiednumber)
    // this.state.editedMobileNo && (this.state.employeeList[edI].mobileno = this.state.editedMobileNo)
    // this.setState({
    //   editIndex: null
    // })
  }
  //#endregion

  //#region update in grid
  updateEId(e) {
    this.setState({
      editedEId: e.target.value
    })
  }

  updateName(e) {
    this.setState({
      editedName: e.target.value
    })
  }

  updateIdbarahNo(e) {
    this.setState({
      editedIdbarahNo: e.target.value
    })
  }

  updateEmailAddress(e) {
    this.setState({
      editedEmailaddress: e.target.value
    })
  }

  updateUnifiednumber(e) {
    this.setState({
      editedUnifiednumber: e.target.value
    })
  }

  updateMobileNo(e) {
    this.setState({
      editedMobileNo: e.target.value
    })
  }
  //#endregion

  //#region ADD EMPLOYEE
  addEmployeeData(e) {
    e.preventDefault();
    let eid = document.getElementById(`eid`).value;
    let name = document.getElementById(`name`).value;
    let idbarahno = document.getElementById(`idbarahno`).value;
    let emailaddress2 = document.getElementById(`emailaddress2`).value;
    let unifiednumber = document.getElementById(`unifiednumber`).value;
    let mobileno = document.getElementById(`mobileno`).value;
    if (eid === "" || name === "" || idbarahno === "" || emailaddress2 === "" || unifiednumber === "" || mobileno === "") {
      alert("All fields are mandatory, Please fill all the fields");
    } else {
      let params = {
        eid: eid,
        name: name,
        idbarahno: idbarahno,
        emailaddress: emailaddress2,
        unifiednumber: unifiednumber,
        mobileno: mobileno
      };
      let headerParams = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'consumer-key': Const.CONSUMERKEY,
        'consumer-secret': Const.CONSUMERSECRET
      };
      //fetch POST call - On success message the data should be displayed in the grid
      fetch(Const.POSTAPI, {
        method: 'post',
        headers: headerParams,
        body: JSON.stringify(params)
      }).then(
        data => data.json()
      ).then(data => {
        if (data.success) {
          alert("Successfully Added");
          console.log(data);
          this.state.employeeList.push(
            {
              eid: eid,
              name: name,
              idbarahno: idbarahno,
              emailaddress: emailaddress2,
              unifiednumber: unifiednumber,
              mobileno: mobileno
            },
          )
          this.setState({
            addEmployee: false,
          })
        } else {
          // alert(data.message);
          console.log(data.message);
        }
      }).catch(data => {
        console.log("Error in POST");
      });
    }
  }
  //#endregion

  cursorPositioning(){
    if(this.state.openCursor == "+"){
        this.setState({
            openCursor : '-'
      });
    }else{
        this.setState({
            openCursor : '+'
      });
    }
}

  //#region  Rendering JSX functions
  rendertoDoList() {
    return (
      <div style={styles.renderTodoList}>
        <h1 style={styles.todoHeader}>Employee List</h1>
        <div style={styles.employeeList}>
          <table className="table table-striped table-dark">
            <thead>
              <tr>
                <th scope="col" style={styles.centerAll} >#</th>
                <th scope="col" style={styles.centerAll} >Emp ID</th>
                <th scope="col" style={styles.centerAll} >Name</th>
                <th scope="col" style={styles.centerAll} >IDBarahNo</th>
                <th scope="col" style={styles.centerAll} >Email Address</th>
                <th scope="col" style={styles.centerAll} >Unified No</th>
                <th scope="col" style={styles.centerAll} >Mobile Number</th>
                <th scope="col" style={styles.centerAll} >Edit</th>
                <th scope="col" style={styles.centerAll} >Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeeList.map((value, index) => {
                return (
                  this.state.editIndex !== index ? 
                  <tr key={index}>
                    <th scope="row" id={index + 1}>{index + 1}</th>
                    <td style={styles.centerAll} id={index + 2}>{value.eid}</td>
                    <td style={styles.centerAll} id={index + 3}>{value.name}</td>
                    <td style={styles.centerAll} id={index + 4}>{value.idbarahno}</td>
                    <td style={styles.centerAll} id={index + 5}>{value.emailaddress}</td>
                    <td style={styles.centerAll} id={index + 6}>{value.unifiednumber}</td>
                    <td style={styles.centerAll} id={index + 7}>{value.mobileno}</td>
                    <td style={styles.centerAll} id={index + 8}><button onClick={() => {
                      this.editEmployee(index)
                    }} className="btn btn-primary">Edit</button></td>
                    <td style={styles.centerAll} id={index + 9}><button onClick={() => {
                      this.deleteEmployee(index)
                    }} className="btn btn-danger">Delete</button></td>
                  </tr>
                    : <tr key={index}>
                      <th scope="row" id={index + 1}>{index + 1}</th>
                      <td style={styles.centerAll} id={index + 2 + 'edit'}><input type="text" defaultValue={value.eid} onChange={this.updateEId} /></td>
                      <td style={styles.centerAll} id={index + 3 + 'edit'}><input type="text" defaultValue={value.name} onChange={this.updateName} /></td>
                      <td style={styles.centerAll} id={index + 4 + 'edit'}><input type="text" defaultValue={value.idbarahno} onChange={this.updateIdbarahNo} /></td>
                      <td style={styles.centerAll} id={index + 5 + 'edit'}><input type="text" defaultValue={value.emailaddress} onChange={this.updateEmailAddress} /></td>
                      <td style={styles.centerAll} id={index + 6 + 'edit'}><input type="text" defaultValue={value.unifiednumber} onChange={this.updateUnifiednumber} /></td>
                      <td style={styles.centerAll} id={index + 7 + 'edit'}><input type="text" defaultValue={value.mobileno} onChange={this.updateMobileNo} /></td>
                      <td style={styles.centerAll} id={index + 8 + 'edit'}><button onClick={() => {
                        this.canceleditEmployee()
                      }} className="btn btn-primary">Cancel</button></td>
                      <td style={styles.centerAll} id={index + 9}><button onClick={() => {
                        this.updateEmployee(index)
                      }} className="btn btn-info">Update</button></td>
                    </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <a className="btn-large green" style={{ cursor: "pointer" }} onClick={() => {
          this.addEmployee()
        }}><i >+ Add Employee</i> </a>


      </div>
    )
  }

  renderAddEmployee() {
    return (
      <div style={styles.loginForm}>
        <h1 style={styles.todoHeader}>Add Employee</h1>
        <label style={{ font: "10px" }}> All fields are mandatory *</label>
        <form style={styles.addEmployeeForm} onSubmit={(e) =>
          this.addEmployeeData(e)
        }>
          <div className="form-group">
            <label >Emp ID</label>
            <input type="text" value={this.state.empIDFld} className="form-control" id="eid" aria-describedby="emailHelp"
              onChange={event => this.setState({ empIDFld: event.target.value.replace(/\D/, '') })}
              placeholder="Enter EMP ID(only numbers)" />
          </div>
          <div className="form-group">
            <label >Name</label>
            <input type="text" value={this.state.userNameFld} className="form-control" id="name" aria-describedby="emailHelp"
              onChange={event => this.setState({ userNameFld: event.target.value.replace(/[^A-Za-z]/ig, '') })}
              placeholder="Enter Name" />
          </div>
          <div className="form-group">
            <label >IDBarahNo</label>
            <input type="text" value={this.state.iDBarahNumFld} className="form-control" id="idbarahno" aria-describedby="emailHelp"
              onChange={event => this.setState({ iDBarahNumFld: event.target.value.replace(/\D/, '') })}
              placeholder="Enter IDBarahNo(only numbers)" />
          </div>
          <div className="form-group">
            <label >Email address</label>
            {/* for negative use case */}
            <input type="email" value={this.state.emailAddr} onBlur={() => this.validateEmail(this.state.emailAddr)} className="form-control" id="emailaddress2" aria-describedby="emailHelp"
              onChange={event => this.setState({ emailAddr: event.target.value })}
              placeholder="Enter email" />
          </div>
          <div className="form-group">
            <label >Unified No</label>
            <input type="text" value={this.state.unifiedNumFld} className="form-control" id="unifiednumber" aria-describedby="emailHelp"
              onChange={event => this.setState({ unifiedNumFld: event.target.value.replace(/\D/, '') })}
              placeholder="Enter Unified No(only numbers)" />
          </div>
          <div className="form-group">
            <label >Mobile No</label>
            <input type="text" value={this.state.mobileNumFld} maxLength={12} className="form-control" id="mobileno" aria-describedby="emailHelp"
              onChange={event => this.setState({ mobileNumFld: event.target.value.replace(/\D/, '') })}
              placeholder="Enter Mobile No(12 digits)" />
          </div>
          < button type="submit" class="btn btn-primary" ><i class="material-icons">+ Create Records</i></button>
        </form>
        <button className="btn btn-danger addEmployeeForm" onClick={() => {
          this.cancelAddEmployee()
        }}>Cancel</button>
      </div>
    )
  }

  //#endregion

  render() {
    return (
      <div key="renderPage" style={styles.App}>
        {!this.state.addEmployee && this.rendertoDoList()}
        {this.state.addEmployee && this.renderAddEmployee()}
        <div>
          <br />
          <br />
          <br />
          <hr />
          <h3> GET calls</h3>
          <hr />
        </div>
        <Accordion >
          <Card style={styles.accordion} >
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" onClick={()=> {this.cursorPositioning()}} style={{ "border": "2px solid grey " }} eventKey="0">
                Get Images {this.state.openCursor}
                        </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0" >
              <Card.Body style={styles.panel}>
                <div className="row flex-row">
                  {this.bindCard()}
                </div>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </div>
    );
  }
}

export default EmployeeListComponent;