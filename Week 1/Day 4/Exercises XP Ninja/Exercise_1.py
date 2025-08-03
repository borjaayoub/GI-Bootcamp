import random
import time
import os


class Cell:
    """Represents a single cell in the Game of Life."""

    def __init__(self, alive=False):
        self.alive = alive

    def __str__(self):
        return "█" if self.alive else "░"

    def is_alive(self):
        return self.alive

    def set_alive(self, alive):
        self.alive = alive


class GameOfLife:
    """Main class for Conway's Game of Life implementation."""

    def __init__(self, width=20, height=20, expandable=False, max_size=10000):
        self.width = width
        self.height = height
        self.expandable = expandable
        self.max_size = max_size
        self.generation = 0
        self.grid = self._create_grid()

    def _create_grid(self):
        """Create a new grid with dead cells."""
        return [[Cell() for _ in range(self.width)] for _ in range(self.height)]

    def set_cell(self, x, y, alive):
        """Set a cell to alive or dead."""
        if 0 <= x < self.width and 0 <= y < self.height:
            self.grid[y][x].set_alive(alive)

    def get_cell(self, x, y):
        """Get a cell at the specified position."""
        if 0 <= x < self.width and 0 <= y < self.height:
            return self.grid[y][x]
        return None

    def count_neighbors(self, x, y):
        """Count the number of live neighbors for a cell."""
        count = 0
        for dx in [-1, 0, 1]:
            for dy in [-1, 0, 1]:
                if dx == 0 and dy == 0:
                    continue
                nx, ny = x + dx, y + dy
                if self.expandable:
                    # For expandable borders, check if we need to expand
                    if nx < 0 or nx >= self.width or ny < 0 or ny >= self.height:
                        continue  # For now, treat as dead
                else:
                    # For fixed borders, only count if within bounds
                    if 0 <= nx < self.width and 0 <= ny < self.height:
                        if self.grid[ny][nx].is_alive():
                            count += 1
                    continue

                # For expandable borders within current bounds
                if 0 <= nx < self.width and 0 <= ny < self.height:
                    if self.grid[ny][nx].is_alive():
                        count += 1
        return count

    def next_generation(self):
        """Calculate the next generation based on Conway's rules."""
        new_grid = self._create_grid()

        for y in range(self.height):
            for x in range(self.width):
                neighbors = self.count_neighbors(x, y)
                current_cell = self.grid[y][x]
                new_cell = new_grid[y][x]

                # Apply Conway's rules
                if current_cell.is_alive():
                    if neighbors < 2 or neighbors > 3:
                        new_cell.set_alive(False)  # Dies
                    else:
                        new_cell.set_alive(True)  # Lives
                else:
                    if neighbors == 3:
                        new_cell.set_alive(True)  # Becomes alive
                    else:
                        new_cell.set_alive(False)  # Stays dead

        self.grid = new_grid
        self.generation += 1

    def display(self):
        """Display the current state of the grid."""
        os.system("cls" if os.name == "nt" else "clear")  # Clear screen
        print(f"Generation: {self.generation}")
        print("=" * (self.width * 2 + 2))

        for row in self.grid:
            print("│", end="")
            for cell in row:
                print(f"{cell}", end="")
            print("│")

        print("=" * (self.width * 2 + 2))

    def set_pattern(self, pattern_name):
        """Set predefined patterns."""
        if pattern_name == "glider":
            # Glider pattern
            self.set_cell(1, 0, True)
            self.set_cell(2, 1, True)
            self.set_cell(0, 2, True)
            self.set_cell(1, 2, True)
            self.set_cell(2, 2, True)

        elif pattern_name == "blinker":
            # Blinker pattern (oscillator)
            self.set_cell(10, 10, True)
            self.set_cell(10, 11, True)
            self.set_cell(10, 12, True)

        elif pattern_name == "block":
            # Still life - Block
            self.set_cell(10, 10, True)
            self.set_cell(11, 10, True)
            self.set_cell(10, 11, True)
            self.set_cell(11, 11, True)

        elif pattern_name == "toad":
            # Toad pattern (oscillator)
            self.set_cell(10, 10, True)
            self.set_cell(11, 10, True)
            self.set_cell(12, 10, True)
            self.set_cell(9, 11, True)
            self.set_cell(10, 11, True)
            self.set_cell(11, 11, True)

        elif pattern_name == "random":
            # Random pattern
            for y in range(self.height):
                for x in range(self.width):
                    if random.random() < 0.3:  # 30% chance of being alive
                        self.set_cell(x, y, True)

    def run_simulation(self, generations=50, delay=0.5):
        """Run the simulation for a specified number of generations."""
        print(f"Starting Game of Life simulation with {generations} generations...")
        print(f"Border type: {'Expandable' if self.expandable else 'Fixed'}")
        print("Press Ctrl+C to stop early\n")

        try:
            for _ in range(generations):
                self.display()
                time.sleep(delay)
                self.next_generation()

                # Check if all cells are dead
                all_dead = all(not cell.is_alive() for row in self.grid for cell in row)
                if all_dead:
                    print("All cells are dead. Simulation ended.")
                    break

        except KeyboardInterrupt:
            print("\nSimulation stopped by user.")

        print(f"Final generation: {self.generation}")


def quick_demo():
    """Quick demonstration of different patterns."""
    print("Conway's Game of Life - Quick Demo")
    print("=" * 40)

    # Test glider pattern
    print("\n1. GLIDER PATTERN (moves diagonally):")
    game1 = GameOfLife(width=15, height=15, expandable=False)
    game1.set_pattern("glider")
    for i in range(10):
        game1.display()
        time.sleep(0.5)
        game1.next_generation()

    # Test blinker pattern
    print("\n2. BLINKER PATTERN (oscillator):")
    game2 = GameOfLife(width=15, height=15, expandable=False)
    game2.set_pattern("blinker")
    for i in range(6):
        game2.display()
        time.sleep(0.8)
        game2.next_generation()

    # Test block pattern
    print("\n3. BLOCK PATTERN (still life):")
    game3 = GameOfLife(width=15, height=15, expandable=False)
    game3.set_pattern("block")
    for i in range(5):
        game3.display()
        time.sleep(0.5)
        game3.next_generation()

    print("\nDemo completed! All patterns working correctly.")


def main():
    """Main function to demonstrate different patterns."""
    print("Conway's Game of Life Implementation")
    print("=" * 40)

    # Quick demo first
    quick_demo()

    print("\n" + "=" * 50)
    print("FULL SIMULATION MODE")
    print("=" * 50)

    # Test different patterns
    patterns = ["glider", "blinker", "block", "toad", "random"]

    for pattern in patterns:
        print(f"\nTesting {pattern.upper()} pattern:")
        print("-" * 30)

        # Create game with fixed borders
        game = GameOfLife(width=20, height=20, expandable=False)
        game.set_pattern(pattern)
        game.run_simulation(generations=20, delay=0.3)

        input("\nPress Enter to continue to next pattern...")

    # Test expandable borders (bonus)
    print("\n" + "=" * 50)
    print("BONUS: Testing expandable borders with glider pattern")
    print("=" * 50)

    game_expandable = GameOfLife(width=15, height=15, expandable=True, max_size=10000)
    game_expandable.set_pattern("glider")
    game_expandable.run_simulation(generations=30, delay=0.4)


if __name__ == "__main__":
    main()
