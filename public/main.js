document.getElementById('updateButton').addEventListener('click', updateEntry)
document.getElementById('deleteButton').addEventListener('click', deleteEntry)


//todo: need to refactor function, update is not reflecting in MongoDB
async function updateEntry () {
  const move = document.querySelector('.move').innerText
  const position = document.querySelector('.position').innerText
  const attire = document.querySelector('.attire').innerText
  try {
    const response = await fetch('updateEntry', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'moveName': move, //document.getElementsByName('move')[0].value, //try changing to innerText
        'positionName': position, //document.getElementsByName('position')[0].value,
        'giOrNoGi': attire,//document.getElementsByName('attire')[0].value
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  } catch (error) {
    console.log(error)
  }
}

async function deleteEntry () {
  const input = document.getElementById('deleteInput')
  try {
    const response = await fetch('deleteEntry', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: input.value //todo: need to refactor this, delete is not reflecting in MongoDB
      })
    })
    const data = await response.json()
    location.reload()
  } catch (error) {
    console.log(error)
  }
}