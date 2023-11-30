import java.nio.file.Paths
import java.nio.file.Files
import java.io.IOException

fun main() {
    val filePath = "day1.txt"

    val lines = Files.readAllLines(Paths.get(filePath))

    for (line in lines) {
        println(line)
    }
}
