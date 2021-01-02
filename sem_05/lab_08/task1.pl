ok.
isFib(0, 1, 0, B) :-
    write(0), nl,
    isFib(1, 1, 0, B).
isFib(F1, F2, A, B) :-
    F3 is (F1 + F2),
    F2 < A,
    isFib(F2, F3, A, B).
isFib(F1, F2, A, B) :- 
    F3 is (F1 + F2),
    F2 >= A,
    F2 =< B,
    write(F2), nl,
    isFib(F2, F3, A, B);
ok.
input(A, B) :- read(A), read(B); ok.
f :- input(A, B), isFib(0, 1, A, B); ok.
