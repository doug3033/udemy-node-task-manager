require('../src/db/mongoose')
const User = require('../src/models/user')
const Task = require('../src/models/task')

// User.findByIdAndUpdate('5e052d9a4d611e4814eb9a27', {age: 1}).then((user) => {
//     console.log(user)
//     return User.countDocuments({age: 50})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e)
// })

// Task.findByIdAndDelete('5e07c053ff544f5be033b20a').then((task) => {
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log('The count is '+ result)
// }).catch((e) => {
//     console.log(e)
// })


const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age })
    const count = await User.countDocuments({ age })
    return count
}

const deleteTaskAndCount = async (id) => {
    await Task.findByIdAndDelete(id)
    return await Task.countDocuments({ completed: false })
}

// updateAgeAndCount('5e052d9a4d611e4814eb9a27', 0).then((count) => {
//     console.log(count)
// }).catch((e) => {
//     console.log(e)
// })

deleteTaskAndCount('5e0526a4ad9e713f18396c25').then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e)
})