const sources = [
  "1984 by George Orwell",
  "The Lord of the Rings by J.R.R. Tolkien",
  "The Kite Runner by Khaled Hosseini",
  "Harry Potter and the Philosopher’s Stone by J.K. Rowling",
  "Slaughterhouse-Five by Kurt Vonnegut",
  "The Lion, the Witch, and the Wardrobe by C.S. Lewis",
  "To Kill a Mockingbird by Harper Lee",
  "The Book Thief by Markus Zusak",
  "Wuthering Heights by Emily Bronte",
  "The Catcher in the Rye by J.D. Salinger",
  "Jane Eyre by Charlotte Bronte",
  "Animal Farm by George Orwell",
  "Fahrenheit 451 by Ray Bradbury"
]

const getRandomSouces = () => {
  const shuffled = sources.sort(() => 0.5 - Math.random());
  const n = Math.floor(Math.random() * sources.length)
  return shuffled.slice(0, n);
}

const PlagiarismService = {
  getRandomSouces
}

export default PlagiarismService