.form-group {
  position: relative;
  margin: 0 auto;
  width: 100%;
}

.form-group input.password {
  font-size: 20px;
}

.form-group input {
  height: 50px;
  width: 100%;
  border: 0;
  border-radius: 4px;
  font-family: Manrope, sans-serif;
  color: #200020;
  background-color: #e5e7fb71;
  font-size: 16px;
  padding: 24px 48px 6px 16px;
  margin: 0 auto;
  display: block;
  outline: none;
}

.form-group label {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.2s ease;
  pointer-events: none;
  color: #200020;
  font-size: 16px;
  font-family: Manrope, sans-serif;
  font-weight: 400;
  background: #f8f7fb; /* Evita que se superponga al borde */
  padding: 0 4px;
}

/* Cuando el input tiene foco o es vÃ¡lido (tiene texto) */
.form-group input:focus + label,
.form-group input:valid + label {
  top: 5px;
  font-size: 14px;
  color: #0004da;
  transform: none;
}