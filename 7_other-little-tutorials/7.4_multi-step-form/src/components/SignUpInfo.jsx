function SignUpInfo ({ formData, setFormData }) {
    return (
        <div className="sign-up-container">
            <input
                type="text"
                placeholder="Enter email..." 
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <input
                type="password"
                placeholder="Enter password..." 
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
            />
            <input
                type="password"
                placeholder="Confirm password..." 
                value={formData.confirmPassword}
                onChange={e => setFormData({...formData, confirmPassword: e.target.value})}
            />
        </div>
    )
}

export default SignUpInfo