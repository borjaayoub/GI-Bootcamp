import random

class Gene:
    """A Gene is a single value 0 or 1 that can mutate (flip)."""
    
    def __init__(self, value=None):
        """Initialize a gene with a random value (0 or 1) if not specified."""
        if value is None:
            self.value = random.randint(0, 1)
        else:
            self.value = value
    
    def mutate(self):
        """Flip the gene value (0 becomes 1, 1 becomes 0)."""
        self.value = 1 - self.value
    
    def __str__(self):
        return str(self.value)
    
    def __repr__(self):
        return f"Gene({self.value})"


class Chromosome:
    """A Chromosome is a series of 10 Genes that can mutate."""
    
    def __init__(self):
        """Initialize a chromosome with 10 random genes."""
        self.genes = [Gene() for _ in range(10)]
    
    def mutate(self):
        """Mutate the chromosome: each gene has 1/2 chance to flip."""
        for gene in self.genes:
            if random.random() < 0.5:  # 1/2 chance to flip
                gene.mutate()
    
    def __str__(self):
        return ''.join(str(gene) for gene in self.genes)
    
    def __repr__(self):
        return f"Chromosome({self.__str__()})"


class DNA:
    """A DNA is a series of 10 chromosomes that can mutate."""
    
    def __init__(self):
        """Initialize DNA with 10 random chromosomes."""
        self.chromosomes = [Chromosome() for _ in range(10)]
    
    def mutate(self):
        """Mutate the DNA: each chromosome has 1/2 chance to mutate."""
        for chromosome in self.chromosomes:
            if random.random() < 0.5:  # 1/2 chance to mutate
                chromosome.mutate()
    
    def __str__(self):
        return '\n'.join(f"Chromosome {i+1}: {chromosome}" for i, chromosome in enumerate(self.chromosomes))
    
    def __repr__(self):
        return f"DNA({len(self.chromosomes)} chromosomes)"
    
    def is_all_ones(self):
        """Check if all genes in all chromosomes are 1."""
        for chromosome in self.chromosomes:
            for gene in chromosome.genes:
                if gene.value != 1:
                    return False
        return True
    
    def get_fitness_score(self):
        """Calculate fitness score based on number of 1s in DNA."""
        total_ones = 0
        total_genes = 0
        for chromosome in self.chromosomes:
            for gene in chromosome.genes:
                total_ones += gene.value
                total_genes += 1
        return total_ones / total_genes if total_genes > 0 else 0


class Organism:
    """An Organism has DNA and can mutate based on environment pressure."""
    
    def __init__(self, dna, environment_mutation_rate=0.5):
        """
        Initialize an organism with DNA and environment mutation rate.
        
        Args:
            dna: DNA object
            environment_mutation_rate: Probability for DNA to mutate (0.0 to 1.0)
        """
        self.dna = dna
        self.environment_mutation_rate = environment_mutation_rate
        self.generation = 0
    
    def evolve(self):
        """Evolve the organism: DNA mutates based on environment pressure."""
        if random.random() < self.environment_mutation_rate:
            self.dna.mutate()
        self.generation += 1
    
    def is_perfect(self):
        """Check if the organism has evolved to all 1s."""
        return self.dna.is_all_ones()
    
    def get_fitness(self):
        """Get the fitness score of the organism."""
        return self.dna.get_fitness_score()
    
    def __str__(self):
        return f"Organism(Generation: {self.generation}, Fitness: {self.get_fitness():.2f})"
    
    def __repr__(self):
        return self.__str__()


def simulate_evolution(num_organisms=10, environment_mutation_rate=0.5, max_generations=10000):
    """
    Simulate evolution of organisms until one reaches all 1s.
    
    Args:
        num_organisms: Number of organisms to simulate
        environment_mutation_rate: Probability for DNA to mutate
        max_generations: Maximum generations to run before stopping
    
    Returns:
        tuple: (generations_taken, winning_organism, all_results)
    """
    print(f"=== Evolution Simulation ===")
    print(f"Organisms: {num_organisms}")
    print(f"Environment Mutation Rate: {environment_mutation_rate}")
    print(f"Max Generations: {max_generations}")
    print("="*50)
    
    # Create initial population
    organisms = [Organism(DNA(), environment_mutation_rate) for _ in range(num_organisms)]
    all_results = []
    
    for generation in range(max_generations):
        # Check if any organism has reached perfection
        for organism in organisms:
            if organism.is_perfect():
                print(f"\n🎉 SUCCESS! Organism evolved to all 1s in {generation + 1} generations!")
                print(f"Winning organism: {organism}")
                print(f"Final DNA:\n{organism.dna}")
                return generation + 1, organism, all_results
        
        # Evolve all organisms
        for organism in organisms:
            organism.evolve()
        
        # Record fitness statistics every 100 generations
        if generation % 100 == 0:
            fitness_scores = [org.get_fitness() for org in organisms]
            avg_fitness = sum(fitness_scores) / len(fitness_scores)
            max_fitness = max(fitness_scores)
            min_fitness = min(fitness_scores)
            
            all_results.append({
                'generation': generation,
                'avg_fitness': avg_fitness,
                'max_fitness': max_fitness,
                'min_fitness': min_fitness
            })
            
            print(f"Generation {generation}: Avg={avg_fitness:.3f}, Max={max_fitness:.3f}, Min={min_fitness:.3f}")
    
    print(f"\n❌ FAILED! No organism reached all 1s in {max_generations} generations.")
    return max_generations, None, all_results


# Example usage and testing
if __name__ == "__main__":
    print("=== DNA Object System ===\n")
    
    # Create a DNA object
    dna = DNA()
    print("Initial DNA:")
    print(dna)
    print("\n" + "="*50 + "\n")
    
    # Mutate the DNA
    print("After DNA mutation:")
    dna.mutate()
    print(dna)
    print("\n" + "="*50 + "\n")
    
    # Test individual components
    print("=== Testing Individual Components ===\n")
    
    # Test Gene
    gene = Gene(1)
    print(f"Original gene: {gene}")
    gene.mutate()
    print(f"After mutation: {gene}")
    print()
    
    # Test Chromosome
    chromosome = Chromosome()
    print(f"Original chromosome: {chromosome}")
    chromosome.mutate()
    print(f"After mutation: {chromosome}")
    print()
    
    # Test DNA
    print("DNA object created successfully!")
    print(f"DNA has {len(dna.chromosomes)} chromosomes")
    print(f"Each chromosome has {len(dna.chromosomes[0].genes)} genes")
    print()
    
    # Test Organism
    print("=== Testing Organism ===\n")
    organism = Organism(DNA(), environment_mutation_rate=0.8)
    print(f"Initial organism: {organism}")
    print(f"Fitness: {organism.get_fitness():.3f}")
    print(f"Is perfect: {organism.is_perfect()}")
    print()
    
    # Run evolution simulation
    print("=== Running Evolution Simulation ===\n")
    generations, winner, results = simulate_evolution(
        num_organisms=20, 
        environment_mutation_rate=0.7, 
        max_generations=5000
    )
    
    if winner:
        print(f"\n🏆 Evolution completed in {generations} generations!")
        print(f"Final fitness: {winner.get_fitness():.3f}")
    else:
        print(f"\n⏰ Evolution stopped after {generations} generations without success.")
    
    # Show evolution statistics
    if results:
        print(f"\n📊 Evolution Statistics:")
        print(f"Total generations tracked: {len(results)}")
        if len(results) > 1:
            first_avg = results[0]['avg_fitness']
            last_avg = results[-1]['avg_fitness']
            print(f"Fitness improvement: {first_avg:.3f} → {last_avg:.3f}")
            print(f"Best fitness achieved: {max(r['max_fitness'] for r in results):.3f}")
