class TicTacToe {
    constructor() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0, tie: 0 };
        this.winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        
        this.cells = document.querySelectorAll('.cell');
        this.gameStatus = document.getElementById('game-status');
        this.resetBtn = document.getElementById('reset-btn');
        this.xScore = document.getElementById('x-score');
        this.oScore = document.getElementById('o-score');
        this.tieScore = document.getElementById('tie-score');
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.makeMove(index));
        });
        
        this.resetBtn.addEventListener('click', () => this.resetGame());
        this.updateStatus();
    }
    
    makeMove(index) {
        if (this.board[index] !== '' || !this.gameActive) return;
        
        this.board[index] = this.currentPlayer;
        this.cells[index].textContent = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        // Add move animation
        this.cells[index].style.transform = 'scale(1.2)';
        setTimeout(() => {
            this.cells[index].style.transform = 'scale(1)';
        }, 200);
        
        if (this.checkWinner()) {
            this.gameActive = false;
            this.scores[this.currentPlayer]++;
            this.updateScores();
            this.gameStatus.textContent = `Player ${this.currentPlayer} Wins!`;
            this.gameStatus.classList.add('winner');
            this.highlightWinningCells();
            this.celebrate();
        } else if (this.board.every(cell => cell !== '')) {
            this.gameActive = false;
            this.scores.tie++;
            this.updateScores();
            this.gameStatus.textContent = "It's a Tie!";
            this.gameStatus.classList.add('winner');
        } else {
            this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
            this.updateStatus();
        }
    }
    
    checkWinner() {
        return this.winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return this.board[a] && 
                   this.board[a] === this.board[b] && 
                   this.board[a] === this.board[c];
        });
    }
    
    highlightWinningCells() {
        this.winningCombinations.forEach(combination => {
            const [a, b, c] = combination;
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]) {
                this.cells[a].classList.add('winning-line');
                this.cells[b].classList.add('winning-line');
                this.cells[c].classList.add('winning-line');
            }
        });
    }
    
    celebrate() {
        const container = document.querySelector('.game-container');
        const gameBoard = document.querySelector('.game-board');
        const boardRect = gameBoard.getBoundingClientRect();
        
        // Enhanced sparkles with varying sizes and colors
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const sparkle = document.createElement('div');
                const size = Math.random() * 8 + 4; // Random size between 4px and 12px
                const colors = ['#00ff00', '#00bfff', '#ff1493', '#8a2be2'];
                const color = colors[Math.floor(Math.random() * colors.length)];
                sparkle.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, ${color}, transparent);
                    border-radius: 50%;
                    pointer-events: none;
                    left: ${Math.random() * boardRect.width}px;
                    top: ${Math.random() * boardRect.height}px;
                    animation: sparkle 1.2s ease-out forwards;
                    z-index: 10;
                `;
                gameBoard.appendChild(sparkle);
                setTimeout(() => sparkle.remove(), 1200);
            }, i * 30);
        }
        
        // Add star burst effect
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                const star = document.createElement('div');
                const size = Math.random() * 10 + 5;
                const angle = Math.random() * 360;
                const distance = Math.random() * 100 + 50;
                star.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    background: radial-gradient(circle, #ffffff, transparent);
                    clip-path: polygon(
                        50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 
                        50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%
                    );
                    pointer-events: none;
                    left: ${boardRect.width / 2}px;
                    top: ${boardRect.height / 2}px;
                    transform: translate(-50%, -50%) rotate(${angle}deg);
                    animation: starBurst 1.5s ease-out forwards;
                    z-index: 10;
                `;
                gameBoard.appendChild(star);
                setTimeout(() => star.remove(), 1500);
            }, i * 50);
        }
        
        // Add animation keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes sparkle {
                0% { transform: scale(0) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
                100% { transform: scale(0) rotate(360deg); opacity: 0; }
            }
            @keyframes starBurst {
                0% { transform: translate(-50%, -50%) rotate(0deg) translateX(0); opacity: 1; }
                100% { transform: translate(-50%, -50%) rotate(360deg) translateX(${distance}px); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
    
    updateStatus() {
        this.gameStatus.textContent = `Player ${this.currentPlayer}'s Turn`;
        this.gameStatus.classList.remove('winner');
    }
    
    updateScores() {
        this.xScore.textContent = this.scores.X;
        this.oScore.textContent = this.scores.O;
        this.tieScore.textContent = this.scores.tie;
    }
    
    resetGame() {
        this.board = Array(9).fill('');
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('x', 'o', 'winning-line');
        });
        
        this.updateStatus();
        
        // Reset button animation
        this.resetBtn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.resetBtn.style.transform = 'scale(1)';
        }, 100);
    }
}

// Initialize the game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
});

// Add some background effects
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    
    // Create floating particles
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: radial-gradient(circle, rgba(74, 0, 255, 0.6), rgba(138, 43, 226, 0.3));
            border-radius: 50%;
            pointer-events: none;
            z-index: -1;
            animation: float ${Math.random() * 10 + 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        body.appendChild(particle);
    }
    
    // Add float animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});