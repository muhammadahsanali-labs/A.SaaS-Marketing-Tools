document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    const phrases = [
        "Generate metadata",
        "Analyze keywords",
        "Monitor SEO health",
        "Streamline workflows"
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // Timing config (in ms)
    const typingSpeed = 80;
    const deletingSpeed = 40;
    const delayBetweenPhrases = 2000;
    
    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            textElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let dynamicSpeed = isDeleting ? deletingSpeed : typingSpeed;
        
        if (!isDeleting && charIndex === currentPhrase.length) {
            // Pause at end of phrase
            dynamicSpeed = delayBetweenPhrases;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            dynamicSpeed = 500; // Small pause before typing next word
        }
        
        setTimeout(type, dynamicSpeed);
    }
    
    // Start animation
    setTimeout(type, 1000);
});