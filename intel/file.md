3.0

MOV AL DL - przeniesienie rejestru na drugie miejsce. DL jest niezmieniane | y
EXCH AL DL - zamiana miejscami rejestrów | y

3.5

INC - zwiększenie o 1. Po max zmiena na 0 => INC AL |y
DEC - zmniejszenie o 1. Po min na max => DEC AH |y
NOT - odwrócenie 0 na 1 => NOT AH |y
NEG = NOT + INC  |y

4.0

AND - koniunkcja bitowa => AND DL BH - przypisc do DL |y
OR |y
XOR |y
ADD AH AL - suma zawrtości obu 0 przypisz do AH |y
SUB |y

4.5

MUL |y
IMUL - mnożenie |y
DIV |y
IDIV - dzielenie |y

MUL BH - mnożenie AL i podanego przez nas rejestru. Zapisujemy to na dwóch rejestrach AH i AL

DIV DL - dzielenie AL poprzez podany przez nas rejestr. Zapisujemy wynik w AL i reszte w AH

Grafika na + pół oceny | y
