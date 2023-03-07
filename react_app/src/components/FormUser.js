import {useState, useEffect} from 'react'


const FormUser = ({onChangeForm, createOrUpdateUser, user, resetForm }) => {
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [numberOfHobbies, setNumberOfHobbies] = useState(0);

    const reset = (e) => {
        e.preventDefault();
        resetForm(e);
        setNumberOfHobbies(0);
        setShowAddressForm(false);
    }

    useEffect(() => {
        if(user.hobbies) {
            setNumberOfHobbies(user.hobbies.length);
        }
        if(user.address && user.address.street) {
            setShowAddressForm(true);
        }
    }, [user]);


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
                            <input type="text" name="phone" onChange={(e) => onChangeForm(e)} value={user.phone?user.phone.no:''} className="form-control" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="phone_type">Phone Type</label>
                            <input type="text" name="phone_type" onChange={(e) => onChangeForm(e)} value={user.phone?user.phone.description:''} className="form-control" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="form-group col-md-3">
                            {[...Array(numberOfHobbies)].map((e, i) =>{ 
                                return (<div key={i}>Hobby {i+1}:
                                    <input type="text" name={`hobby-${i}`} onChange={(e) => onChangeForm(e)} value={user.hobbies?user.hobbies[i]:''} className="form-control" />
                                </div>)
                            })}
                        </div>
                        <div className="form-group col-md-9">
                            {showAddressForm && <div>
                                <label htmlFor="street">Street</label>
                                <input type="text" name="street" onChange={(e) => onChangeForm(e)} value={user.address?user.address.street:''} className="form-control" />
                                <label htmlFor="city">City</label>
                                <input type="text" name="city" onChange={(e) => onChangeForm(e)} value={user.address?user.address.city:''} className="form-control" />
                                <label htmlFor="country">Country</label>
                                <input type="text" name="country" onChange={(e) => onChangeForm(e)} value={user.address?user.address.country:''} className="form-control" />
                                <label htmlFor="zip">Zip</label>
                                <input type="text" name="zip" onChange={(e) => onChangeForm(e)} value={user.address?user.address.zip:''} className="form-control" />
                            </div>}
                        </div>
                    </div>
                    <button type="button" onClick={(e) => createOrUpdateUser()} className="btn mybutton">Create or Update User</button>
                    <button type="button" onClick={()=>setShowAddressForm(!showAddressForm)} className="btn mybutton">Add Address</button>
                    <button type="button" onClick={()=>setNumberOfHobbies(numberOfHobbies+1)} className="btn mybutton">Add Hobby</button>
                    <button type="button" onClick={reset} className="btn mybutton">Reset Form</button>
                </form>
                </div>
            </div>
        </div>
    )
}

export default FormUser