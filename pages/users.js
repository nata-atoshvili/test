import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './users.module.css'
import '../app/globals.css'

const User = ({ firstName, lastName, image }) => (
  <div className={styles.user}>
    <img
      src={image}
      alt={`${firstName} ${lastName}`}
      className={styles.userImage}
    />
    <div>
      {firstName} {lastName}
    </div>
  </div>
)

export default function Users() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  console.log('USERS PAGE');

  useEffect(() => {
    fetchUsersData()
  }, [])

  const fetchUsersData = () => {
    fetch("https://dummyjson.com/users")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setData(data)
        setLoading(false);
      })
  }

  const handleReload = () => {
    setLoading(true);
    fetchUsersData();
  }

  return (
    <main className={styles.root}>
      <button onClick={handleReload}>reload</button>
      {loading && 'Loading ...'}
      {!loading && data && data.users && data.users.length > 0 && data.users.map(user => (
        <User key={user.id} {...user} />
      ))}
    </main>
  )
}
