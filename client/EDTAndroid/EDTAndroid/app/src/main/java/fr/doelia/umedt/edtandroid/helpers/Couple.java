package fr.doelia.umedt.edtandroid;

public class Couple <A, B> {

	private A _a;
	private B _b;

	public Couple(A a, B b)
	{
		_a = a;
		_b = b;
	}

	public A a()
	{
		return _a;
	}

	public B b()
	{
		return _b;
	}

}
