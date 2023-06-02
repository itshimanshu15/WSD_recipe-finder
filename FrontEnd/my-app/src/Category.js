import React,{Component} from 'react';
import {variables} from './Variables.js';

export class Category extends Component{

    constructor(props){
        super(props);

        this.state={
            category:[],
            modalTitle:"",
            CategoryName:"",
            CategoryId:0,

            CategoryIdFilter:"",
            CategoryNameFilter:"",
            categoryWithoutFilter:[]
        }
    }

    FilterFn(){
        var CategoryIdFilter=this.state.CategoryIdFilter;
        var CategoryNameFilter = this.state.CategoryNameFilter;

        var filteredData=this.state.categoryWithoutFilter.filter(
            function(el){
                return el.CategoryId.toString().toLowerCase().includes(
                    CategoryIdFilter.toString().trim().toLowerCase()
                )&&
                el.CategoryName.toString().toLowerCase().includes(
                    CategoryNameFilter.toString().trim().toLowerCase()
                )
            }
        );

        this.setState({category:filteredData});

    }

    sortResult(prop,asc){
        var sortedData=this.state.categoryWithoutFilter.sort(function(a,b){
            if(asc){
                return (a[prop]>b[prop])?1:((a[prop]<b[prop])?-1:0);
            }
            else{
                return (b[prop]>a[prop])?1:((b[prop]<a[prop])?-1:0);
            }
        });

        this.setState({category:sortedData});
    }

    changeCategoryIdFilter = (e)=>{
        this.state.CategoryIdFilter=e.target.value;
        this.FilterFn();
    }
    changeCategoryNameFilter = (e)=>{
        this.state.CategoryNameFilter=e.target.value;
        this.FilterFn();
    }

    refreshList(){
        fetch(variables.API_URL+'category')
        .then(response=>response.json())
        .then(data=>{
            this.setState({category:data,categoryWithoutFilter:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }
    
    changeCategoryName =(e)=>{
        this.setState({CategoryName:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Add Category",
            CategoryId:0,
            CategoryName:""
        });
    }
    editClick(cat){
        this.setState({
            modalTitle:"Edit Category",
            CategoryId:cat.CategoryId,
            CategoryName:cat.CategoryName
        });
    }

    createClick(){
        fetch(variables.API_URL+'category',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CategoryName:this.state.CategoryName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'category',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                CategoryId:this.state.CategoryId,
                CategoryName:this.state.CategoryName
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'category/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }

    render(){
        const {
            category,
            modalTitle,
            CategoryId,
            CategoryName
        }=this.state;

        return(
<div>

    <button type="button"
    className="btn btn-success m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Category
    </button>
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            <div className="d-flex flex-row">

            
            <input className="form-control m-1"
            onChange={this.changeCategoryIdFilter}
            placeholder="Filter"/>
            &nbsp;
            
            <button type="button" className="btn btn-light border border-dark"
            onClick={()=>this.sortResult('CategoryId',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
            &nbsp;&nbsp;

            <button type="button" className="btn btn-light border border-dark"
            onClick={()=>this.sortResult('CategoryId',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>

            </div><br></br>
            CategoryId
        </th>
        <th>
        <div className="d-flex flex-row">
        <input className="form-control m-1"
            onChange={this.changeCategoryNameFilter}
            placeholder="Filter"/>
            &nbsp;

            <button type="button" className="btn btn-light border border-dark"
            onClick={()=>this.sortResult('CategoryName',true)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0z"/>
                </svg>
            </button>
            &nbsp;&nbsp;

            <button type="button" className="btn btn-light border border-dark"
            onClick={()=>this.sortResult('CategoryName',false)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-up-square-fill" viewBox="0 0 16 16">
                <path d="M2 16a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2zm6.5-4.5V5.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 5.707V11.5a.5.5 0 0 0 1 0z"/>
                </svg>
            </button>
            </div><br></br>
            CategoryName
      
        </th>
        <th>
            Options
        </th>
    </tr>
    </thead>
    <tbody>
        {category.map(cat=>
            <tr key={cat.CategoryId}>
                <td>{cat.CategoryId}</td>
                <td>{cat.CategoryName}</td>
                <td>
                <button type="button"
                className="btn btn-light mr-1 border border-dark"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.editClick(cat)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
                &nbsp;&nbsp;&nbsp;

                <button type="button"
                className="btn btn-light mr-1 border border-dark"
                onClick={()=>this.deleteClick(cat.CategoryId)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                    </svg>
                </button>

                </td>
            </tr>
            )}
    </tbody>
    </table>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
       <div className="input-group mb-3">
        <span className="input-group-text">CategoryName</span>
        <input type="text" className="form-control"
        value={CategoryName}
        onChange={this.changeCategoryName}/>
       </div>

        {CategoryId===0?
        <button type="button"
        className="btn btn-success float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {CategoryId!==0?
        <button type="button"
        className="btn btn-success float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>


</div>
        )
    }
}