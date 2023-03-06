import React from 'react'


const FormUser = ({onChangeForm, createOrUpdateUser, user }) => {

console.log('user: ', user);
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-7 mrgnbtm">
                <h2>Create or update User</h2>
                <form>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" onChange={(e) => onChangeForm(e)} value={user.name}  className="form-control" id="name" aria-describedby="emailHelp" placeholder="Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" onChange={(e) => onChangeForm(e)} value={user.email} className="form-control" id="email" placeholder="Email" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="password">Password</label>
                            <input type="text" name="password" onChange={(e) => onChangeForm(e)} value={user.password} className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="phone">Phone</label>
                            <input type="text" name="phone" onChange={(e) => onChangeForm(e)} value={user.phone?user.phone.no:''} className="form-control" id="password" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="phone_type">Phone Type</label>
                            <input type="text" name="phone_type" onChange={(e) => onChangeForm(e)} value={user.phone?user.phone.description:''} className="form-control" id="password" />
                        </div>
                    </div>
                    <button type="button" onClick= {(e) => createOrUpdateUser()} className="btn btn-danger">Create</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default FormUser