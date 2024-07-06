const User = ({ user, handleLogout }) => {
  return (
    <div>
      <p>
        {user.name} logged in
        <button onClick={handleLogout}>Logout</button>
      </p>
    </div>
  )
}

export default User